import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Database, Download, Phone, BarChart3, TrendingUp, Brain } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes barGrow1 {
          0%, 100% { height: 0%; }
          8.33%, 91.67% { height: 60%; }
        }
        @keyframes barGrow2 {
          0%, 100% { height: 0%; }
          16.67%, 83.33% { height: 80%; }
        }
        @keyframes barGrow3 {
          0%, 100% { height: 0%; }
          25%, 75% { height: 40%; }
        }
        @keyframes barGrow4 {
          0%, 100% { height: 0%; }
          33.33%, 66.67% { height: 90%; }
        }
        @keyframes barGrow5 {
          0%, 100% { height: 0%; }
          41.67%, 58.33% { height: 70%; }
        }
        
        @keyframes lineGrow {
          0%, 33.33%, 100% { stroke-dasharray: 0, 100; }
          41.67%, 58.33% { stroke-dasharray: 100, 0; }
        }
        
        @keyframes circleGrow {
          0%, 66.67%, 100% { stroke-dasharray: 0, 100; }
          75%, 91.67% { stroke-dasharray: 96, 100; }
        }
        
        @keyframes percentageShow {
          0%, 75%, 100% { opacity: 0; transform: scale(0.5); }
          83.33%, 91.67% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes containerGlow1 {
          0%, 100% { border-color: rgba(75, 85, 99, 0.3); box-shadow: none; }
          8.33%, 41.67% { border-color: rgba(59, 130, 246, 0.6); box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        }
        
        @keyframes containerGlow2 {
          0%, 100% { border-color: rgba(75, 85, 99, 0.3); box-shadow: none; }
          41.67%, 66.67% { border-color: rgba(16, 185, 129, 0.6); box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
        }
        
        @keyframes containerGlow3 {
          0%, 100% { border-color: rgba(75, 85, 99, 0.3); box-shadow: none; }
          66.67%, 91.67% { border-color: rgba(139, 92, 246, 0.6); box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
        }
        
        @keyframes iconBounce1 {
          0%, 100% { transform: scale(1); }
          8.33%, 41.67% { transform: scale(1.2); }
        }
        
        @keyframes iconBounce2 {
          0%, 100% { transform: scale(1); }
          41.67%, 66.67% { transform: scale(1.2); }
        }
        
        @keyframes iconBounce3 {
          0%, 100% { transform: scale(1); }
          66.67%, 91.67% { transform: scale(1.2); }
        }
        
        .bar-1 { animation: barGrow1 12s infinite; }
        .bar-2 { animation: barGrow2 12s infinite; }
        .bar-3 { animation: barGrow3 12s infinite; }
        .bar-4 { animation: barGrow4 12s infinite; }
        .bar-5 { animation: barGrow5 12s infinite; }
        
        .line-chart { animation: lineGrow 12s infinite; }
        .circle-chart { animation: circleGrow 12s infinite; }
        .percentage-text { animation: percentageShow 12s infinite; }
        
        .container-glow-1 { animation: containerGlow1 12s infinite; }
        .container-glow-2 { animation: containerGlow2 12s infinite; }
        .container-glow-3 { animation: containerGlow3 12s infinite; }
        
        .icon-bounce-1 { animation: iconBounce1 12s infinite; }
        .icon-bounce-2 { animation: iconBounce2 12s infinite; }
        .icon-bounce-3 { animation: iconBounce3 12s infinite; }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="animate-fade-in text-left lg:text-left">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mt-20">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Available for Opportunities
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  <span className="block">Hi, I'm</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                    Ananthnath
                  </span>
                </h1>
                <div className="text-2xl sm:text-3xl text-gray-300 mb-6 font-light">
                  Data Visualization Expert & Analytics Specialist
                </div>
              </div>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
                Transforming complex data into compelling visual stories and actionable insights through advanced analytics. 
                Passionate about creating data-driven solutions that drive business impact and innovation.
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-blue-400" />
                  <span>ananthnatherukulla@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-400" />
                  <span>+91-6301658065</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                <button
                  onClick={scrollToAbout}
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Explore My Work
                  <ArrowDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform duration-300" />
                </button>
                
                <a
                  href="https://acrobat.adobe.com/id/urn:aaid:sc:AP:ac0f088c-f654-4396-a6f2-b3f92bf743bf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gray-800 border-2 border-gray-700 text-gray-300 rounded-full font-semibold hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Download size={20} className="mr-2" />
                  Download Resume
                </a>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-8">
                <a
                  href="https://github.com/ananth0701"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/25"
                >
                  <Github size={24} className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                </a>
                <a
                  href="https://linkedin.com/in/ananthnatherukulla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/25"
                >
                  <Linkedin size={24} className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                </a>
                <a
                  href="mailto:ananthnatherukulla@gmail.com"
                  className="group p-4 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/25"
                >
                  <Mail size={24} className="text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Animated Data Science Dashboard */}
          <div className="animate-fade-in lg:flex lg:justify-center">
            <div className="relative">
              {/* Animated Data Science Dashboard */}
              <div className="w-96 h-96 mx-auto relative">
                {/* Main Dashboard Container */}
                <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl border border-gray-600 overflow-hidden hover:shadow-3xl hover:scale-105 transition-all duration-500 cursor-pointer group">
                  {/* Dashboard Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Database size={20} className="text-white" />
                      <span className="text-white font-semibold text-sm">Live Analytics Dashboard</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 space-y-4">
                    {/* Top Row - Charts */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Animated Bar Chart */}
                      <div className="bg-gray-700/50 rounded-xl p-3 border border-gray-600 container-glow-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <BarChart3 size={16} className="text-blue-400" />
                          <span className="text-xs text-gray-300">Sales Data</span>
                        </div>
                        <div className="flex items-end justify-center space-x-1 h-12">
                          <div className="w-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t bar-1"></div>
                          <div className="w-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t bar-2"></div>
                          <div className="w-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t bar-3"></div>
                          <div className="w-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t bar-4"></div>
                          <div className="w-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t bar-5"></div>
                        </div>
                      </div>

                      {/* Animated Line Chart */}
                      <div className="bg-gray-700/50 rounded-xl p-3 border border-gray-600 container-glow-2 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <TrendingUp size={16} className="text-green-400" />
                          <span className="text-xs text-gray-300">Growth Trend</span>
                        </div>
                        <div className="relative h-12 flex items-center justify-center">
                          <svg className="w-full h-full" viewBox="0 0 80 40">
                            <polyline
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2"
                              points="10,35 20,25 30,30 40,15 50,20 60,10 70,8"
                              className="line-chart"
                              strokeDasharray="0,100"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Middle Row - Animated Model Performance */}
                    <div className="bg-gray-700/50 rounded-xl p-3 border border-gray-600 container-glow-3 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <Brain size={16} className="text-purple-400" />
                        <span className="text-xs text-gray-300">ML Model Accuracy</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="relative w-20 h-20">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#374151"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#8b5cf6"
                              strokeWidth="3"
                              strokeDasharray="0,100"
                              className="circle-chart"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-purple-400 percentage-text">96%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row - Live Metrics */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center border border-gray-600">
                        <div className="text-sm font-bold text-blue-400">1.2M</div>
                        <div className="text-xs text-gray-400">Records</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center border border-gray-600">
                        <div className="text-sm font-bold text-green-400">99.8%</div>
                        <div className="text-xs text-gray-400">Uptime</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center border border-gray-600">
                        <div className="text-sm font-bold text-yellow-400">15ms</div>
                        <div className="text-xs text-gray-400">Latency</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Floating Data Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg icon-bounce-1 transition-transform duration-300">
                  <BarChart3 size={20} className="text-white" />
                </div>

                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg icon-bounce-2 transition-transform duration-300">
                  <TrendingUp size={20} className="text-white" />
                </div>

                <div className="absolute top-1/2 -left-6 w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg icon-bounce-3 transition-transform duration-300">
                  <Brain size={16} className="text-white" />
                </div>

                <div className="absolute top-1/4 -right-6 w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-700">
                  <Database size={14} className="text-white" />
                </div>
              </div>

              {/* Animated Stats Cards */}
              <div className="absolute -bottom-8 -left-8 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 shadow-xl hover:bg-gray-700/90 hover:border-blue-500 hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="text-2xl font-bold text-blue-400">96%</div>
                <div className="text-xs text-gray-400">Model Accuracy</div>
              </div>

              <div className="absolute -top-8 -right-8 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 shadow-xl hover:bg-gray-700/90 hover:border-purple-500 hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="text-2xl font-bold text-purple-400">10+</div>
                <div className="text-xs text-gray-400">Certifications</div>
              </div>

              <div className="absolute top-1/2 -left-12 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 shadow-xl hover:bg-gray-700/90 hover:border-green-500 hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="text-2xl font-bold text-green-400">6+</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;