import React from 'react';
import { Github, Zap, Trophy, Users, ArrowRight, Star, GitBranch, Code, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">ForkNight</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-900/50 text-purple-200 px-4 py-2 rounded-full mb-8 border border-purple-500/30">
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Level Up Your Open Source Journey</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Turn <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Commits</span>
            <br />
            Into <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Conquests</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your GitHub contributions into an epic gaming experience. Earn XP, unlock badges, 
            climb leaderboards, and turn open source burnout into pure excitement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">
              <Github className="w-5 h-5" />
              <span>Connect with GitHub</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="border-2 border-purple-500 text-purple-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-500/10 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center hover:border-purple-500/30 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-gray-400">Commits Gamified</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center hover:border-purple-500/30 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-400">Active Players</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center hover:border-purple-500/30 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-400">Unique Badges</div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">ForkNight?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Earn XP</h3>
              <p className="text-gray-400">Every commit, PR, and issue earns you experience points. Level up your coding journey!</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Unlock Badges</h3>
              <p className="text-gray-400">Collect rare badges like "Bug Slayer", "Merge Master", and "Code Ninja".</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Compete</h3>
              <p className="text-gray-400">Climb leaderboards and compete with developers worldwide or within your team.</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Track Streaks</h3>
              <p className="text-gray-400">Maintain coding streaks for bonus XP and exclusive achievements.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Level Up?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who've transformed their open source journey from burnout to badges.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 mx-auto hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">
            <Github className="w-5 h-5" />
            <span>Start Your Quest</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ForkNight</span>
          </div>
          <p className="text-gray-400">
            Turning open source contributions into epic adventures, one commit at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;