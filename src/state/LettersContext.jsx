import { createContext, useContext, useState, useCallback } from "react";
import { API_BASE } from "../apiBase";

const LettersContext = createContext(null);

export default function LettersProvider({ children }) {
  const [letters, setLetters] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadLetters = useCallback(
    async (force = false) => {
      if (loaded && !force) return;
      if (loading) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/letters`);
        const data = await res.json();
        setLetters(data);
        setLoaded(true);
      } catch (e) {
        console.error("Failed to load letters", e);
      } finally {
        setLoading(false);
      }
    },
    [loaded, loading]
  );

  const addLetter = useCallback((newLetter) => {
    // optimistic: put new letter on top, avoid duplicates by id
    setLetters((prev) => [
      newLetter,
      ...prev.filter((l) => l.id !== newLetter.id),
    ]);
  }, []);

  return (
    <LettersContext.Provider
      value={{ letters, loaded, loading, loadLetters, addLetter }}
    >
      {children}
    </LettersContext.Provider>
  );
}

export function useLetters() {
  const ctx = useContext(LettersContext);
  if (!ctx) throw new Error("useLetters must be used within LettersProvider");
  return ctx;
}
