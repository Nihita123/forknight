import React, { useState, useEffect } from "react";
import {
  Trophy,
  Crown,
  Medal,
  Star,
  Zap,
  Target,
  Github,
  TrendingUp,
  Award,
} from "lucide-react";

// Mock data for demonstration
const leaderboardData = [
  {
    username: "CodeWarrior",
    avatar: "https://github.com/octocat.png",
    xp: 15420,
    commits: 342,
    streak: 45,
  },
  {
    username: "GitMaster",
    avatar: "https://github.com/github.png",
    xp: 14890,
    commits: 298,
    streak: 38,
  },
  {
    username: "OpenSourceHero",
    avatar: "https://github.com/defunkt.png",
    xp: 14200,
    commits: 276,
    streak: 42,
  },
  {
    username: "CommitLegend",
    avatar: "https://github.com/pjhyett.png",
    xp: 12850,
    commits: 234,
    streak: 28,
  },
  {
    username: "RepoKnight",
    avatar: "https://github.com/mojombo.png",
    xp: 11900,
    commits: 201,
    streak: 33,
  },
  {
    username: "BranchMaster",
    avatar: "https://github.com/wycats.png",
    xp: 10750,
    commits: 189,
    streak: 25,
  },
  {
    username: "MergeWizard",
    avatar: "https://github.com/kevinclark.png",
    xp: 9800,
    commits: 167,
    streak: 19,
  },
  {
    username: "PullRequestPro",
    avatar: "https://github.com/technoweenie.png",
    xp: 8900,
    commits: 145,
    streak: 22,
  },
];

const FloatingParticles = ({ count = 8, color = "purple-400", size = "2" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-${size} h-${size} bg-${color} rounded-full animate-pulse opacity-20`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const PodiumStep = ({ position, user, height, glowColor, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isFirst = position === 1;
  const isSecond = position === 2;
  const isThird = position === 3;

  const gradientClasses = {
    1: "from-yellow-400 via-yellow-500 to-yellow-600",
    2: "from-gray-300 via-gray-400 to-gray-500",
    3: "from-orange-400 via-orange-500 to-orange-600",
  };

  return (
    <div
      className={`relative flex flex-col items-center ${height} group cursor-pointer transform transition-all duration-500 ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced floating particles */}
      <FloatingParticles count={8} color={glowColor} size="1" />

      {/* Animated crown with better effects */}
      <div
        className={`absolute -top-8 z-20 p-3 rounded-full bg-gradient-to-r ${
          gradientClasses[position]
        } shadow-2xl transform transition-all duration-300 ${
          isHovered ? "animate-bounce scale-110" : "animate-pulse"
        }`}
      >
        <Icon
          className={`w-7 h-7 ${
            isFirst
              ? "text-yellow-900"
              : isSecond
              ? "text-gray-700"
              : "text-orange-900"
          } drop-shadow-lg`}
        />
        {/* Glow ring */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientClasses[position]} opacity-40 blur-md animate-pulse`}
        />
      </div>

      {/* Enhanced user avatar with better effects */}
      <div
        className={`relative z-10 mb-4 p-1 rounded-full bg-gradient-to-r ${
          gradientClasses[position]
        } shadow-2xl transform transition-all duration-300 ${
          isHovered ? "scale-125 rotate-3" : ""
        }`}
      >
        <img
          src={user.avatar}
          alt={user.username}
          className="w-20 h-20 rounded-full border-4 border-white shadow-2xl"
        />
        {/* Multiple glow layers */}
        <div
          className={`absolute inset-0 rounded-full bg-${glowColor} opacity-30 blur-lg animate-pulse`}
        />
        <div
          className={`absolute inset-0 rounded-full bg-${glowColor} opacity-10 blur-2xl`}
        />
      </div>

      {/* Enhanced username display */}
      <div className="text-white font-bold text-base mb-3 text-center px-4 py-2 bg-gradient-to-r from-black/40 to-black/20 rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
        {user.username}
      </div>

      {/* Enhanced XP display with stats */}
      <div className="space-y-2 mb-4">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${
            isFirst
              ? "from-yellow-400/30 to-yellow-600/30"
              : isSecond
              ? "from-gray-300/30 to-gray-500/30"
              : "from-orange-400/30 to-orange-600/30"
          } border border-white/40 backdrop-blur-md shadow-lg`}
        >
          <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
          <span className="text-white font-mono text-base font-bold">
            {user.xp.toLocaleString()}
          </span>
          <span className="text-gray-200 text-sm">XP</span>
        </div>

        {/* Mini stats */}
        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1 px-2 py-1 bg-black/30 rounded-full backdrop-blur-sm">
            <Target className="w-3 h-3 text-blue-400" />
            <span className="text-white font-mono">{user.commits}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-black/30 rounded-full backdrop-blur-sm">
            <Star className="w-3 h-3 text-orange-400" />
            <span className="text-white font-mono">{user.streak}</span>
          </div>
        </div>
      </div>

      {/* Enhanced podium step */}
      <div
        className={`relative w-full bg-gradient-to-t ${gradientClasses[position]} rounded-t-2xl shadow-2xl flex-1 flex items-center justify-center border-4 border-white/40 overflow-hidden`}
      >
        {/* Animated number */}
        <div
          className={`text-7xl font-bold text-white/90 drop-shadow-2xl transform transition-all duration-300 ${
            isHovered ? "scale-110" : ""
          }`}
        >
          {position}
        </div>

        {/* Enhanced geometric patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-t-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-t-2xl" />

        {/* Animated shine effect */}
        <div
          className={`absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-2xl transform transition-all duration-300 ${
            isHovered ? "animate-pulse" : ""
          }`}
        />

        {/* Side decorations */}
        <div className="absolute left-2 top-4 w-1 h-8 bg-white/20 rounded-full" />
        <div className="absolute right-2 top-4 w-1 h-8 bg-white/20 rounded-full" />
      </div>
    </div>
  );
};

const LeaderboardCard = ({ rank, username, avatar, xp, commits, streak }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl transition-all duration-500 cursor-pointer ${
        isHovered
          ? "scale-105 border-purple-400/60 shadow-2xl"
          : "hover:border-purple-400/50"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced animated background glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl transition-all duration-500 ${
          isHovered ? "opacity-100 scale-110" : "opacity-0"
        }`}
      />

      {/* Floating particles for card */}
      <FloatingParticles count={4} color="purple-400" size="1" />

      <div className="relative flex items-center px-6 py-5 gap-5">
        {/* Enhanced rank badge */}
        <div
          className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg border-2 border-white/20 transform transition-all duration-300 ${
            isHovered ? "scale-110 rotate-12" : ""
          }`}
        >
          <span className="text-xl font-bold text-white drop-shadow-lg">
            #{rank}
          </span>
        </div>

        {/* Enhanced avatar */}
        <div className="relative">
          <img
            src={avatar}
            alt={username}
            className={`w-14 h-14 rounded-full border-3 border-white/40 shadow-lg transition-all duration-300 ${
              isHovered ? "border-purple-400/70 scale-110" : ""
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 transition-all duration-300 ${
              isHovered ? "opacity-100 blur-sm" : "opacity-0"
            }`}
          />
          {/* Activity indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse" />
        </div>

        {/* Enhanced user info */}
        <div className="flex-1">
          <div
            className={`text-white font-bold text-xl mb-2 transition-all duration-300 ${
              isHovered ? "text-purple-200" : ""
            }`}
          >
            {username}
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="font-mono">{commits}</span>
              <span className="text-gray-400">commits</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-orange-400" />
              <span className="font-mono">{streak}</span>
              <span className="text-gray-400">day streak</span>
            </div>
          </div>
        </div>

        {/* Enhanced XP display */}
        <div
          className={`flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full border border-white/30 backdrop-blur-sm shadow-lg transition-all duration-300 ${
            isHovered ? "scale-105 border-purple-400/50" : ""
          }`}
        >
          <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
          <div className="text-right">
            <div className="text-white font-mono font-bold text-xl">
              {xp.toLocaleString()}
            </div>
            <div className="text-gray-300 text-sm">XP</div>
          </div>
        </div>

        {/* Trend indicator */}
        <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full border border-green-400/30">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-mono">+12%</span>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const topThree = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-6 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

        {/* Enhanced floating particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      {/* Enhanced header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full border border-white/30 backdrop-blur-md mb-8 shadow-xl">
          <Trophy className="w-7 h-7 text-yellow-400 animate-pulse" />
          <span className="text-white font-semibold text-lg">
            Level Up Your Open Source Journey
          </span>
          <Award className="w-6 h-6 text-purple-400" />
        </div>

        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-pulse">
          🏆 Champions Arena
        </h1>

        <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
          Transform your GitHub contributions into epic conquests. Climb the
          leaderboard and become a legend in the developer community!
        </p>
      </div>

      {/* Enhanced podium section */}
      <div className="max-w-5xl mx-auto mb-20 relative z-10">
        <div className="flex items-end justify-center gap-12 mb-12">
          {/* 2nd Place */}
          <PodiumStep
            position={2}
            user={topThree[1]}
            height="h-52"
            glowColor="gray-400"
            icon={Medal}
          />

          {/* 1st Place */}
          <PodiumStep
            position={1}
            user={topThree[0]}
            height="h-72"
            glowColor="yellow-400"
            icon={Crown}
          />

          {/* 3rd Place */}
          <PodiumStep
            position={3}
            user={topThree[2]}
            height="h-44"
            glowColor="orange-400"
            icon={Trophy}
          />
        </div>
      </div>

      {/* Enhanced rest of leaderboard */}
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Rising Warriors
          </h2>
          <p className="text-gray-400 text-lg">
            Keep climbing to reach the podium and claim your crown!
          </p>
        </div>

        {restOfLeaderboard.map((user, index) => (
          <LeaderboardCard
            key={user.username}
            rank={index + 4}
            username={user.username}
            avatar={user.avatar}
            xp={user.xp}
            commits={user.commits}
            streak={user.streak}
          />
        ))}
      </div>

      {/* Enhanced call to action */}
      <div className="text-center mt-20 relative z-10">
        <div className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20">
          <Github className="w-6 h-6" />
          <span>Connect with GitHub</span>
          <div className="flex items-center gap-1">
            <span className="text-2xl">→</span>
            <Star className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <p className="text-gray-400 mt-4 text-lg">
          Join the elite developers community today
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
