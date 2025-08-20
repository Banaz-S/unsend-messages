export const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://unsend-messages.up.railway.app"
    : "http://localhost:5000";
