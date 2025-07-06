// routes/github.js
import express from "express";
import {
  getProfile,
  getRepoCount,
  getTotalPRs,
  getTotalIssues,
  getTotalCommits,
  getWeeklyStats,
} from "../utils/githubApi.js";

const router = express.Router();

/* Middleware that protects every route below */
const ensureAuth = (req, res, next) =>
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ message: "Not authenticated" });

router.use(ensureAuth);

/* ------------------------------------------------------------------ */
/*  /api/github/profile  -------------------------------------------- */
router.get("/profile", async (req, res) => {
  try {
    const data = await getProfile(req.user.accessToken);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "GitHub request failed", err });
  }
});

/* ------------------------------------------------------------------ */
/*  /api/github/stats  ---------------------------------------------- */
router.get("/stats", async (req, res) => {
  try {
    const token = req.user.accessToken;
    const login = req.user.username;

    const [repos, totalPRs, totalIssues, totalCommits] = await Promise.all([
      getRepoCount(token),
      getTotalPRs(token, login),
      getTotalIssues(token, login),
      getTotalCommits(token),
    ]);

    res.json({ repos, totalPRs, totalIssues, totalCommits });
  } catch (err) {
    res.status(500).json({ message: "GitHub request failed", err });
  }
});

/* ------------------------------------------------------------------ */
/*  /api/github/weekly-activity  ------------------------------------ */
router.get("/weekly-activity", async (req, res) => {
  try {
    const data = await getWeeklyStats(req.user.accessToken);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "GitHub request failed", err });
  }
});

/* ------------------------------------------------------------------ */
/*  /api/github/achievements  --------------------------------------- */
/*  Simple example: compute on the fly from stats.                    */
router.get("/achievements", async (req, res) => {
  try {
    const token = req.user.accessToken;
    const login = req.user.username;

    const totalCommits = await getTotalCommits(token);
    const totalPRs = await getTotalPRs(token, login);

    const achievements = [
      {
        id: 1,
        name: "First Blood",
        unlocked: totalCommits >= 1,
      },
      {
        id: 2,
        name: "Code Ninja",
        unlocked: totalCommits >= 100,
      },
      {
        id: 3,
        name: "PR Master",
        unlocked: totalPRs >= 50,
      },
      // add more rules here …
    ];

    res.json({ achievements });
  } catch (err) {
    res.status(500).json({ message: "Achievement calc failed", err });
  }
});

/* ------------------------------------------------------------------ */
/*  /api/leaderboard  ------------------------------------------------ */
/*  For now: stubbed. In production you’d read from DB.               */
router.get("/leaderboard", async (_req, res) => {
  res.json([
    { rank: 1, name: "CodeMaster3000", xp: 25600, level: 48 },
    { rank: 2, name: "DevNinja", xp: 23400, level: 45 },
    { rank: 3, name: "CodeWarrior", xp: 18750, level: 42 },
  ]);
});

export default router;
