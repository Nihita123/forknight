import React, { useState, useEffect } from "react";
import {
  Github,
  Zap,
  Trophy,
  Users,
  ArrowRight,
  Star,
  GitBranch,
  Code,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();
  const words = [
    "Commits",
    "Pull Requests",
    "Issues",
    "Repositories",
    "Code Reviews",
  ];
  const currentWord = words[currentWordIndex];

  // Initialize particles
  useEffect(() => {
    const particleCount = 50;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStats(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 150;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setTypedText((prev) =>
          isDeleting
            ? prev.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentWord, currentWordIndex]);

  const FloatingBadge = ({ children, delay = 0 }) => (
    <div
      className="absolute animate-bounce"
      style={{
        animation: `float 3s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.8);
          }
        }
        @keyframes slideInUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes countUp {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-3deg);
          }
          75% {
            transform: rotate(3deg);
          }
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes wave {
          0% {
            transform: translateX(-100%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
          100% {
            transform: translateX(0%) translateY(0px);
          }
        }
        @keyframes floatParticle {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .typing-cursor::after {
          content: "|";
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        .animate-count-up {
          animation: countUp 0.6s ease-out forwards;
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
        .animated-bg {
          background: linear-gradient(
            -45deg,
            #1e1b4b,
            #581c87,
            #7c2d12,
            #1e1b4b
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        .wave-layer {
          position: absolute;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.1),
            transparent
          );
          animation: wave 20s linear infinite;
        }
        .wave-layer:nth-child(2) {
          animation-delay: -10s;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(236, 72, 153, 0.1),
            transparent
          );
        }
        .wave-layer:nth-child(3) {
          animation-delay: -15s;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.1),
            transparent
          );
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 animated-bg">
        {/* Moving wave layers */}
        <div className="wave-layer"></div>
        <div className="wave-layer"></div>
        <div className="wave-layer"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                animation: `floatParticle ${
                  3 + Math.random() * 2
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80"></div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <FloatingBadge delay={0}>
          <div className="top-20 left-20 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center opacity-30">
            <Trophy className="w-8 h-8 text-white" />
          </div>
        </FloatingBadge>
        <FloatingBadge delay={1}>
          <div className="top-40 right-32 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center opacity-30">
            <Star className="w-6 h-6 text-white" />
          </div>
        </FloatingBadge>
        <FloatingBadge delay={2}>
          <div className="bottom-40 left-16 w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center opacity-30">
            <Zap className="w-7 h-7 text-white" />
          </div>
        </FloatingBadge>
        <FloatingBadge delay={0.5}>
          <div className="top-60 right-20 w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center opacity-25">
            <Code className="w-5 h-5 text-white" />
          </div>
        </FloatingBadge>
        <FloatingBadge delay={1.5}>
          <div className="bottom-60 right-40 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center opacity-25">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
        </FloatingBadge>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto relative z-20">
        <div className="flex items-center space-x-3 animate-slide-up">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-glow">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">ForkNight</span>
        </div>

        <div
          className="flex items-center space-x-6 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors hover:animate-wiggle"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-300 hover:text-white transition-colors hover:animate-wiggle"
          >
            How It Works
          </a>
          <button
            onClick={() => navigate("/auth")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 animate-glow"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20 relative z-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-900/50 text-purple-200 px-4 py-2 rounded-full mb-8 border border-purple-500/30 animate-slide-up backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              Level Up Your Open Source Journey
            </span>
          </div>

          <h1
            className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            Turn{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent typing-cursor">
              {typedText}
            </span>
            <br />
            Into{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Conquests
            </span>
          </h1>

          <p
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            Transform your GitHub contributions into an epic gaming experience.
            Earn XP, unlock badges, climb leaderboards, and turn open source
            burnout into pure excitement.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
            style={{ animationDelay: "0.9s" }}
          >
            <button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg animate-glow"
            >
              <Github className="w-5 h-5" />
              <span>Connect with GitHub</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button className="border-2 border-purple-500 text-purple-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-500/10 transition-all hover:animate-wiggle backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div
            className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center hover:border-purple-500/30 transition-all ${
              showStats ? "animate-count-up" : "opacity-0"
            }`}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-gray-400">Commits Gamified</div>
          </div>

          <div
            className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center hover:border-purple-500/30 transition-all ${
              showStats ? "animate-count-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-400">Active Players</div>
          </div>

          <div
            className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center hover:border-purple-500/30 transition-all ${
              showStats ? "animate-count-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-400">Unique Badges</div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-16 animate-slide-up">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ForkNight?
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all group animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:animate-wiggle">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Earn XP</h3>
              <p className="text-gray-400">
                Every commit, PR, and issue earns you experience points. Level
                up your coding journey!
              </p>
            </div>

            <div
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all group animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:animate-wiggle">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Unlock Badges
              </h3>
              <p className="text-gray-400">
                Collect rare badges like "Bug Slayer", "Merge Master", and "Code
                Ninja".
              </p>
            </div>

            <div
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all group animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:animate-wiggle">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Compete</h3>
              <p className="text-gray-400">
                Climb leaderboards and compete with developers worldwide or
                within your team.
              </p>
            </div>

            <div
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all group animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:animate-wiggle">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Track Streaks
              </h3>
              <p className="text-gray-400">
                Maintain coding streaks for bonus XP and exclusive achievements.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 text-center animate-slide-up">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who've transformed their open source
            journey from burnout to badges.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 mx-auto hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg animate-glow"
          >
            <Github className="w-5 h-5" />
            <span>Start Your Quest</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-20 py-12 relative z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ForkNight</span>
          </div>
          <p className="text-gray-400">
            Turning open source contributions into epic adventures, one commit
            at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
