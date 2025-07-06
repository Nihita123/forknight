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

// Middleware to protect routes
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
router.get("/achievements", async (req, res) => {
  try {
    const token = req.user.accessToken;
    const login = req.user.username;

    const [totalCommits, totalPRs, totalIssues, weeklyStats] =
      await Promise.all([
        getTotalCommits(token),
        getTotalPRs(token, login),
        getTotalIssues(token, login),
        getWeeklyStats(token),
      ]);

    // Placeholder logic for streak — can be expanded
    const currentStreak = weeklyStats.commits > 0 ? 1 : 0;

    const achievements = [
      {
        id: 1,
        name: "First Blood - First commit down",
        unlocked: totalCommits >= 1,
      },
      {
        id: 2,
        name: "Code Ninja - 50 commits wohoo",
        unlocked: totalCommits >= 50,
      },
      {
        id: 3,
        name: "PR Master",
        unlocked: totalPRs >= 50,
      },
      {
        id: 4,
        name: "Bug Hunter - 10 issues raised",
        unlocked: totalIssues >= 10,
      },
      {
        id: 5,
        name: "Day One Streaker - 1 day coding streak",
        unlocked: currentStreak >= 1,
      },
      {
        id: 6,
        name: "Consistency Champ - 7-day streak",
        unlocked: currentStreak >= 7,
      },
    ];

    res.json({ achievements });
  } catch (err) {
    res.status(500).json({ message: "Achievement calc failed", err });
  }
});

/* ------------------------------------------------------------------ */
/*  /api/github/leaderboard  ---------------------------------------- */
router.get("/leaderboard", async (_req, res) => {
  res.json([
    { rank: 1, name: "CodeMaster3000", xp: 25600, level: 48 },
    { rank: 2, name: "DevNinja", xp: 23400, level: 45 },
    { rank: 3, name: "CodeWarrior", xp: 18750, level: 42 },
  ]);
});

/* ------------------------------------------------------------------ */
/*  /api/github/repos  ---------------------------------------------- */
router.get("/repos", async (req, res) => {
  try {
    const accessToken = req.user.accessToken;

    const response = await fetch(
      "https://api.github.com/user/repos?per_page=100",
      {
        headers: { Authorization: `token ${accessToken}` },
      }
    );

    if (!response.ok) {
      throw new Error("GitHub API error");
    }

    const repos = await response.json();

    const mappedRepos = repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      url: repo.html_url,
    }));

    res.json(mappedRepos);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch repositories",
      details: error.message,
    });
  }
});

export default router;
