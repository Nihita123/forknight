// server/routes/github.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"
  try {
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
