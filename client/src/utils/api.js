// src/utils/api.js
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const apiGet = async (path) => {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return res.json();
};
