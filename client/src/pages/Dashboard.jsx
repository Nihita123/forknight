import React, { useState, useEffect } from "react";
import {
  Github,
  Trophy,
  Star,
  GitBranch,
  Calendar,
  Target,
  Flame,
  Award,
  TrendingUp,
  Users,
  Code,
  GitPullRequest,
  BookOpen,
  Zap,
  Crown,
  LogOut,
} from "lucide-react";

import { apiGet, apiPost } from "../utils/api";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  /* remote state */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null); // profile + stats
  const [weeklyStats, setWeeklyStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [repos, setRepos] = useState([]);


  /* still static for now */
  const [challenges] = useState([
    {
      id: 1,
      name: "Commit Streak",
      description: "Make 30 commits in 30 days",
      progress: 15,
      total: 30,
      xp: 500,
      type: "streak",
    },
    {
      id: 2,
      name: "PR Perfectionist",
      description: "Get 5 PRs merged this week",
      progress: 3,
      total: 5,
      xp: 300,
      type: "pr",
    },
  ]);

  /* fetch once on mount */
  useEffect(() => {
    const load = async () => {
      try {
        const [profile, stats, weekly, ach, lb, repoList, challengeList] =
          await Promise.all([
            apiGet("/api/github/profile"),
            apiGet("/api/github/stats"),
            apiGet("/api/github/weekly-activity"),
            apiGet("/api/github/achievements"),
            apiGet("/api/leaderboard"),
            apiGet("/api/github/repos"),
            apiGet("/api/github/challenges"),
          ]);

        setUser({
          name: profile.name || profile.login,
          level: calcLevel(stats.totalCommits),
          xp: stats.totalCommits,
          xpToNext: 100 - (stats.totalCommits % 100),
          streak: weekly.commits,
          totalCommits: stats.totalCommits,
          totalPRs: stats.totalPRs,
          totalRepos: stats.repos,
          rank: "Elite Contributor",
        });

        setWeeklyStats(weekly);
        setAchievements(ach.achievements);
        setLeaderboard(lb);
        setRepos(repoList);
        setChallenges(challengeList.challenges); // ✅ THIS LINE BELONGS HERE
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    load(); // ✅ Don't forget to call it
  }, []);

  const calcLevel = (xp) => Math.floor(xp / 1000) + 1;

  /* helper to pick an icon for challenges */
  const getChallengeIcon = (type) => {
    switch (type) {
      case "streak":
        return <Flame className="w-5 h-5" />;
      case "pr":
        return <GitPullRequest className="w-5 h-5" />;
      case "review":
        return <BookOpen className="w-5 h-5" />;
      case "issues":
        return <Target className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  /* ───── loading / error fallbacks ───── */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  /* ---- side‑nav items (static) ---- */
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: "challenges",
      label: "Challenges",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: "repositories",
      label: "Repositories",
      icon: <GitBranch className="w-5 h-5" />,
    },

    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: <Crown className="w-5 h-5" />,
    },
  ];
  const handleLogout = async () => {
    try {
      await apiPost("/api/auth/logout");
      window.location.href = "/"; // or use navigate("/") if using react-router
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. Try again.");
    }
  };

  const topPlayers = Array.isArray(leaderboard) ? leaderboard.slice(0, 5) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white flex">
      {/* Side Navbar */}
      <div className="w-64 bg-black/30 backdrop-blur-md border-r border-purple-500/20 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-purple-500/20">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Forknight
              </h1>
              <p className="text-purple-300 text-xs">
                Level up your open source game
              </p>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-purple-500/20">
          <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-purple-300">Level {user.level}</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-purple-300 mb-1">
              <span>XP</span>
              <span>{user.xp.toLocaleString()}</span>
            </div>
            <div className="w-full bg-purple-900/50 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                style={{ width: `${((user.xp % 50) / 50) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-purple-600/50 to-pink-600/50 border border-purple-500/30 text-white"
                    : "text-purple-300 hover:text-white hover:bg-purple-600/20"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Quick Stats */}
        <div className="p-4 border-t border-purple-500/20">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-purple-600/20 rounded-lg p-2">
              <div className="text-lg font-bold text-green-400">
                {user.streak}
              </div>
              <div className="text-xs text-purple-300">Streak</div>
            </div>
            <div className="bg-purple-600/20 rounded-lg p-2">
              <div className="text-lg font-bold text-yellow-400">
                {user.totalRepos}
              </div>
              <div className="text-xs text-purple-300">Repos</div>
            </div>
          </div>
        </div>
        {/* Logout */}
        <div className="p-4 border-t border-purple-500/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2
               bg-gradient-to-r from-pink-600/40 to-purple-600/40
               hover:from-pink-600/60 hover:to-purple-600/60
               text-white font-semibold py-3 rounded-xl transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
                <p className="text-purple-300 text-sm">
                  {activeTab === "dashboard" && "Welcome back, ready to code?"}
                  {activeTab === "challenges" &&
                    "Complete challenges to earn XP and badges"}
                  {activeTab === "achievements" &&
                    "Show off your coding accomplishments"}
                  {activeTab === "leaderboard" &&
                    "See how you stack up against other devs"}
                  {activeTab === "repositories" &&
                    "Manage your GitHub repositories"}
                  {activeTab === "profile" &&
                    "Customize your developer profile"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-purple-600/20 rounded-lg px-3 py-1 text-sm">
                  <span className="text-purple-300">Rank: </span>
                  <span className="font-bold">{user.rank}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-purple-300">Hey there,</p>
                  <p className="text-lg font-bold">{user.name}! 🎮</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && (
            <div className="max-w-6xl mx-auto">
              {/* User Stats Banner */}
              <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold">{user.name}</h2>
                    <p className="text-purple-300 flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      {user.rank}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-yellow-400">
                      Level {user.level}
                    </div>
                    <div className="text-sm text-purple-300">
                      {user.xp.toLocaleString()} XP
                    </div>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-purple-300 mb-1">
                    <span>Progress to Level {user.level + 1}</span>
                    <span>{user.xpToNext} XP to go</span>
                  </div>
                  <div className="w-full bg-purple-900/50 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${((user.xp % 50) / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {user.totalCommits}
                    </div>
                    <div className="text-sm text-purple-300">Total Commits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {user.totalPRs}
                    </div>
                    <div className="text-sm text-purple-300">Pull Requests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {user.totalRepos}
                    </div>
                    <div className="text-sm text-purple-300">Repositories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400 flex items-center justify-center gap-1">
                      <Flame className="w-5 h-5" />
                      {user.streak}
                    </div>
                    <div className="text-sm text-purple-300">Day Streak</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weekly Activity */}
                <div className="lg:col-span-2">
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 mb-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      This Week's Activity
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-600/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="w-5 h-5 text-green-400" />
                          <span className="text-sm text-purple-300">
                            Commits
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">
                          {weeklyStats.commits}
                        </div>
                      </div>
                      <div className="bg-purple-600/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <GitPullRequest className="w-5 h-5 text-blue-400" />
                          <span className="text-sm text-purple-300">
                            Pull Requests
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-blue-400">
                          {weeklyStats.prs}
                        </div>
                      </div>
                      <div className="bg-purple-600/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-5 h-5 text-yellow-400" />
                          <span className="text-sm text-purple-300">
                            Reviews
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {weeklyStats.reviews}
                        </div>
                      </div>
                      <div className="bg-purple-600/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-orange-400" />
                          <span className="text-sm text-purple-300">
                            Issues Closed
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-orange-400">
                          {weeklyStats.issues}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Challenges */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      Active Challenges
                    </h3>
                    <div className="space-y-4">
                      {challenges.map((challenge) => (
                        <div
                          key={challenge.id}
                          className="bg-purple-600/20 rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="text-purple-400">
                                {getChallengeIcon(challenge.type)}
                              </div>
                              <span className="font-semibold">
                                {challenge.name}
                              </span>
                            </div>
                            <div className="text-yellow-400 font-bold">
                              +{challenge.xp} XP
                            </div>
                          </div>
                          <p className="text-sm text-purple-300 mb-2">
                            {challenge.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-purple-900/50 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${
                                    (challenge.progress / challenge.total) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-purple-300">
                              {challenge.progress}/{challenge.total}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Recent Achievements */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      Recent Achievements
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {achievements.slice(0, 6).map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-3 rounded-xl text-center ${
                            achievement.unlocked
                              ? "bg-gradient-to-br from-yellow-600/30 to-orange-600/30 border border-yellow-500/20"
                              : "bg-purple-600/20 border border-purple-500/20 opacity-50"
                          }`}
                        >
                          <div className="text-2xl mb-1">
                            {achievement.icon}
                          </div>
                          <div className="text-xs font-semibold">
                            {achievement.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Players */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      Top Players
                    </h3>
                    <div className="space-y-3">
                      {topPlayers.map((player) => (
                        <div
                          key={player.rank}
                          className={`flex items-center justify-between p-3 rounded-xl ${
                            player.name === user.name
                              ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30"
                              : "bg-purple-600/20"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{player.badge}</span>
                            <div>
                              <div className="font-semibold text-sm">
                                {player.name}
                              </div>
                              <div className="text-xs text-purple-300">
                                Level {player.level}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold">
                              {player.xp.toLocaleString()} XP
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "challenges" && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl text-purple-400">
                          {getChallengeIcon(challenge.type)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">
                            {challenge.name}
                          </h3>
                          <p className="text-sm text-purple-300">
                            {challenge.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-yellow-400">
                        +{challenge.xp} XP
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-purple-300 mb-1">
                        <span>Progress</span>
                        <span>
                          {challenge.progress}/{challenge.total}
                        </span>
                      </div>
                      <div className="w-full bg-purple-900/50 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (challenge.progress / challenge.total) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">
                        {Math.round(
                          (challenge.progress / challenge.total) * 100
                        )}
                        %
                      </div>
                      <div className="text-sm text-purple-300">Complete</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-2xl border ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-yellow-600/30 to-orange-600/30 border-yellow-500/20"
                        : "bg-black/20 border-purple-500/20 opacity-50"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">{achievement.icon}</div>
                      <h3 className="text-xl font-bold mb-2">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-purple-300">
                        {achievement.description}
                      </p>
                      <div className="mt-4">
                        {achievement.unlocked ? (
                          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            Unlocked!
                          </div>
                        ) : (
                          <div className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                            Locked
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Global Leaderboard
                </h3>
                <div className="space-y-4">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-4 rounded-xl ${
                        player.name === user.name
                          ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30"
                          : "bg-purple-600/20"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{player.badge}</div>
                        <div>
                          <div className="font-bold text-lg">{player.name}</div>
                          <div className="text-sm text-purple-300">
                            Level {player.level}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">
                          {player.xp.toLocaleString()} XP
                        </div>
                        <div className="text-sm text-purple-300">
                          Rank #{player.rank}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "repositories" && (
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repos.length === 0 ? (
                  <div className="col-span-full text-center text-purple-300">
                    No repositories found.
                  </div>
                ) : (
                  repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 transition hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {repo.name}
                        </h3>
                        <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                          {repo.language || "Unknown"}
                        </span>
                      </div>
                      <p className="text-sm text-purple-300 mb-4">
                        {repo.description || "No description provided."}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-purple-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {repo.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="w-4 h-4" />
                          {repo.forks}
                        </div>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
