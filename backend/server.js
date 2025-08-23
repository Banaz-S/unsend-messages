const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ======================
   PostgreSQL connection
   ====================== */
const isNeon =
  /\bneon\.tech\b/.test(process.env.DATABASE_URL || "") ||
  /sslmode=require/.test(process.env.DATABASE_URL || "");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isNeon ? { rejectUnauthorized: false } : undefined,
  // keep resource usage small/reliable on free serverless tiers
  max: 3,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

// DO NOT crash when Neon drops an idle conn
pool.on("error", (err) => {
  console.error("⚠️  PG idle client error:", err.message);
});

// tiny helper: run a query with one retry on transient failures
async function q(sql, params) {
  try {
    return await pool.query(sql, params);
  } catch (e) {
    const msg = String(e.code || e.message || "");
    const transient =
      ["57P01", "53300", "08006"].some((c) => msg.includes(c)) ||
      /ECONNRESET|terminated unexpectedly|Connection reset/i.test(msg);
    if (transient) {
      console.warn("↻ Retrying query after transient error:", msg);
      return pool.query(sql, params);
    }
    throw e;
  }
}

/* ======================
   CORS & body parsing
   ====================== */
const allowed = ["https://banaz-s.github.io", "http://localhost:3000"];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // curl/postman
      cb(null, allowed.includes(origin));
    },
  })
);
app.use(bodyParser.json());

/* ======================
   Defaults (not in DB)
   ====================== */
const defaultLetters = [
  {
    id: "default-1",
    text: "",
    color: "pink",
    border: "flower",
    mention: "Stranger",
    isDefault: true,
  },
  {
    id: "default-2",
    text: "",
    color: "blue",
    border: "canva",
    mention: "A Friend",
    isDefault: true,
  },
  {
    id: "default-3",
    text: "",
    color: "purple",
    border: "flower",
    mention: "Mom",
    isDefault: true,
  },
  {
    id: "default-4",
    text: "",
    color: "grey",
    border: "canva",
    mention: "My Manager",
    isDefault: true,
  },
  {
    id: "default-5",
    text: "",
    color: "peach",
    border: "flower",
    mention: "Me",
    isDefault: true,
  },
  {
    id: "default-6",
    text: "",
    color: "green",
    border: "canva",
    mention: "No Mention",
    isDefault: true,
  },
];

/* ======================
   TTL / Cleanup helpers
   ====================== */
function getTtlConfig() {
  const raw = process.env.TTL_MINUTES;
  const minutes = Number(raw);
  if (Number.isFinite(minutes) && minutes > 0) {
    return { mode: "minutes", value: minutes };
  }
  return { mode: "days", value: 7 };
}

// Delete user letters older than TTL (defaults to 7 days)
async function cleanupLetters() {
  const ttl = getTtlConfig();
  try {
    if (ttl.mode === "minutes") {
      console.log(`🧹 Cleanup using TTL: ${ttl.value} minute(s)`);
      await q(
        `DELETE FROM letters
         WHERE created_at < NOW() - ($1::int * INTERVAL '1 minute')`,
        [ttl.value]
      );
    } else {
      console.log(`🧹 Cleanup using TTL: ${ttl.value} day(s)`);
      await q(
        `DELETE FROM letters
         WHERE created_at < NOW() - INTERVAL '7 days'`
      );
    }
  } catch (e) {
    console.error("Cleanup error:", e.message);
  }
}

// Run cleanup nightly; also when listing letters
cron.schedule("0 0 * * *", cleanupLetters);

/* =============
   API routes
   ============= */

app.get("/health", (_req, res) => res.json({ ok: true }));

// GET all letters (newest user letters first, then defaults)
app.get("/letters", async (_req, res) => {
  try {
    await cleanupLetters();
    const { rows } = await q(
      `SELECT id, text, color, border, mention, created_at
         FROM letters
        ORDER BY created_at DESC`
    );

    const userLetters = rows.map((r) => ({
      id: r.id,
      text: r.text,
      color: r.color,
      border: r.border,
      mention: r.mention,
      createdAt: r.created_at,
      isDefault: false,
    }));

    res.json([...userLetters, ...defaultLetters]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load letters" });
  }
});

// POST a new letter (DB default sets created_at = now())
app.post("/letters", async (req, res) => {
  const { text, color, border, mention } = req.body;
  if (!text || !color || !border || !mention) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const id = Date.now().toString();
    const { rows } = await q(
      `INSERT INTO letters (id, text, color, border, mention)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING created_at`,
      [id, text, color, border, mention]
    );
    const createdAt = rows[0].created_at;

    res.json({
      message: "Letter added",
      letter: { id, text, color, border, mention, createdAt, isDefault: false },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add letter" });
  }
});

app.get("/", (req, res) => {
  res.redirect("https://banaz-s.github.io/unsend-messages");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
