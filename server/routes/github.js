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

router.get("/leaderboard", async (_req, res) => {
  res.json([
    { rank: 1, name: "CodeMaster3000", xp: 25600, level: 48, badge: "🏆" },
    { rank: 2, name: "DevNinja", xp: 23400, level: 45, badge: "🥈" },
    { rank: 3, name: "CodeWarrior", xp: 18750, level: 42, badge: "🥉" },
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

/* ------------------------------------------------------------------ */
/*  /api/github/challenges  ----------------------------------------- */
router.get("/challenges", async (req, res) => {
  const accessToken = req.user.accessToken;
  const username = req.user.username;

  try {
    // Get current date and 30 days ago for streak calculation
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Fetch recent events (last 30 days)
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!eventsRes.ok) {
      throw new Error(`GitHub API error: ${eventsRes.status}`);
    }

    const events = await eventsRes.json();

    // Filter events for the last 30 days
    const recentEvents = events.filter((event) => {
      const eventDate = new Date(event.created_at);
      return eventDate >= thirtyDaysAgo;
    });

    // Filter events for the last 7 days
    const weeklyEvents = events.filter((event) => {
      const eventDate = new Date(event.created_at);
      return eventDate >= oneWeekAgo;
    });

    // Calculate commits in last 30 days
    let commitsLast30Days = 0;
    const commitDates = new Set();

    recentEvents.forEach((event) => {
      if (event.type === "PushEvent" && event.payload.commits) {
        commitsLast30Days += event.payload.commits.length;
        // Track unique days with commits
        const eventDate = new Date(event.created_at).toDateString();
        commitDates.add(eventDate);
      }
    });

    // Calculate PRs merged in last 7 days
    let prsLastWeek = 0;
    weeklyEvents.forEach((event) => {
      if (
        event.type === "PullRequestEvent" &&
        event.payload.action === "closed" &&
        event.payload.pull_request.merged
      ) {
        prsLastWeek += 1;
      }
    });

    // Calculate commit streak (consecutive days with commits)
    const commitStreak = calculateCommitStreak(recentEvents);

    // Fetch additional data for more accurate challenges
    const [searchCommitsRes, searchPRsRes] = await Promise.all([
      // Search for commits in last 30 days
      fetch(
        `https://api.github.com/search/commits?q=author:${username}+committer-date:>=${
          thirtyDaysAgo.toISOString().split("T")[0]
        }&per_page=100`,
        {
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: "application/vnd.github.cloak-preview+json",
          },
        }
      ),
      // Search for PRs in last 7 days
      fetch(
        `https://api.github.com/search/issues?q=author:${username}+type:pr+created:>=${
          oneWeekAgo.toISOString().split("T")[0]
        }&per_page=100`,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      ),
    ]);

    let searchCommits = 0;
    let searchPRs = 0;

    // Use search results if available, otherwise fall back to events
    if (searchCommitsRes.ok) {
      const searchCommitsData = await searchCommitsRes.json();
      searchCommits = searchCommitsData.total_count || 0;
    }

    if (searchPRsRes.ok) {
      const searchPRsData = await searchPRsRes.json();
      searchPRs = searchPRsData.total_count || 0;
    }

    // Use the more accurate count if available
    const finalCommitCount = Math.max(commitsLast30Days, searchCommits);
    const finalPRCount = Math.max(prsLastWeek, searchPRs);

    const challenges = [
      {
        id: 1,
        name: "Commit Streak",
        description: "Make 30 commits in 30 days",
        progress: finalCommitCount,

        total: 50,
        xp: 500,
        type: "streak",
        timeframe: "30 days",
        actualProgress: finalCommitCount,
      },
      {
        id: 2,
        name: "PR Perfectionist",
        description: "Get 5 PRs merged this week",
        progress: finalPRCount,

        total: 5,
        xp: 300,
        type: "pr",
        timeframe: "7 days",
        actualProgress: finalPRCount,
      },
      {
        id: 3,
        name: "Daily Coder",
        description: "Code for 10 consecutive days",
        progress: Math.min(commitStreak, 7),
        total: 10,
        xp: 200,
        type: "streak",
        timeframe: "consecutive days",
        actualProgress: commitStreak,
      },
      {
        id: 4,
        name: "Active Contributor",
        description: "Make commits on 15 different days this month",
        progress: Math.min(commitDates.size, 15),
        total: 15,
        xp: 400,
        type: "consistency",
        timeframe: "30 days",
        actualProgress: commitDates.size,
      },
      {
        id: 5,
        name: "Issue Crusher",
        description: "Close 10 issues in a week",
        progress: 4,
        total: 10,
        xp: 250,
        type: "issues",
      },
      {
        id: 6,
        name: "Review Master",
        description: "Review 5 pull requests",
        progress: 1,
        total: 5,
        xp: 200,
        type: "review",
      },
      {
        id: 7,
        name: "Rapid Fire Commits",
        description: "Push 10 commits in a day",
        progress: 6,
        total: 100,
        xp: 150,
        type: "streak",
      },
      {
        id: 8,
        name: "Open Source Starter",
        description: "Create your first public repo",
        progress: 1,
        total: 1,
        xp: 100,
        type: "repo",
      },
      {
        id: 9,
        name: "Bug Basher",
        description: "Fix 3 bugs reported by others",
        progress: 1,
        total: 3,
        xp: 200,
        type: "issues",
      },
      {
        id: 10,
        name: "Weekly Warrior",
        description: "Complete all weekly tasks",
        progress: 2,
        total: 4,
        xp: 400,
        type: "weekly",
      },
    ];

    res.json({
      challenges,
      debug: {
        eventsCount: events.length,
        recentEventsCount: recentEvents.length,
        weeklyEventsCount: weeklyEvents.length,
        commitDatesCount: commitDates.size,
        finalCommitCount,
        finalPRCount,
        commitStreak,
      },
    });
  } catch (err) {
    console.error("Failed to fetch GitHub challenges:", err);
    res.status(500).json({
      message: "Failed to fetch challenges",
      error: err.stack,
    });
  }
});

// Helper function to calculate commit streak
function calculateCommitStreak(events) {
  const commitDates = new Set();

  events.forEach((event) => {
    if (event.type === "PushEvent" && event.payload.commits) {
      const eventDate = new Date(event.created_at).toDateString();
      commitDates.add(eventDate);
    }
  });

  const sortedDates = Array.from(commitDates)
    .map((date) => new Date(date))
    .sort((a, b) => b - a); // Sort in descending order (most recent first)

  if (sortedDates.length === 0) return 0;

  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if the most recent commit was today or yesterday
  const mostRecentCommit = sortedDates[0];
  mostRecentCommit.setHours(0, 0, 0, 0);

  const daysDifference = Math.floor(
    (today - mostRecentCommit) / (1000 * 60 * 60 * 24)
  );

  if (daysDifference > 1) {
    return 0; // Streak is broken if no commits in the last 2 days
  }

  // Count consecutive days
  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i];
    const previousDate = sortedDates[i - 1];

    currentDate.setHours(0, 0, 0, 0);
    previousDate.setHours(0, 0, 0, 0);

    const daysBetween = Math.floor(
      (previousDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    if (daysBetween === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export default router;
