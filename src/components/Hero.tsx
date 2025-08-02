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

          {/* Right Column - Visual Elements */}
          <div className="animate-fade-in lg:flex lg:justify-center">
            <div className="relative">
              {/* Data Science Dashboard */}
              <div className="w-96 h-96 mx-auto relative">
                {/* Main Dashboard Container */}
                <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl border border-gray-600 overflow-hidden hover:shadow-3xl hover:scale-105 transition-all duration-500 cursor-pointer group">
                  {/* Dashboard Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Database size={20} className="text-white" />
                      <span className="text-white font-semibold text-sm">Data Analytics Dashboard</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 space-y-4">
                    {/* Top Row - Charts */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Bar Chart */}
                      <div className="bg-gray-700/50 rounded-xl p-3 hover:bg-gray-600/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <BarChart3 size={16} className="text-blue-400" />
                          <span className="text-xs text-gray-300">Sales</span>
                        </div>
                        <div className="flex items-end space-x-1 h-12">
                          <div className="w-2 bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
                          <div className="w-2 bg-blue-500 rounded-t" style={{ height: '80%' }}></div>
                          <div className="w-2 bg-blue-500 rounded-t" style={{ height: '40%' }}></div>
                          <div className="w-2 bg-blue-500 rounded-t" style={{ height: '90%' }}></div>
                          <div className="w-2 bg-blue-500 rounded-t" style={{ height: '70%' }}></div>
                        </div>
                      </div>

                      {/* Line Chart */}
                      <div className="bg-gray-700/50 rounded-xl p-3 hover:bg-gray-600/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <TrendingUp size={16} className="text-green-400" />
                          <span className="text-xs text-gray-300">Growth</span>
                        </div>
                        <div className="relative h-12">
                          <svg className="w-full h-full" viewBox="0 0 60 40">
                            <polyline
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2"
                              points="5,35 15,25 25,30 35,15 45,20 55,10"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Middle Row - Pie Chart */}
                    <div className="bg-gray-700/50 rounded-xl p-3 hover:bg-gray-600/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <Brain size={16} className="text-purple-400" />
                        <span className="text-xs text-gray-300">Model Performance</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="relative w-16 h-16">
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
                              strokeDasharray="96, 100"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-purple-400">96%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row - Data Points */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center hover:bg-gray-600/50 transition-all duration-300">
                        <div className="text-sm font-bold text-blue-400">1.2M</div>
                        <div className="text-xs text-gray-400">Records</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center hover:bg-gray-600/50 transition-all duration-300">
                        <div className="text-sm font-bold text-green-400">99.8%</div>
                        <div className="text-xs text-gray-400">Uptime</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center hover:bg-gray-600/50 transition-all duration-300">
                        <div className="text-sm font-bold text-yellow-400">15ms</div>
                        <div className="text-xs text-gray-400">Latency</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Data Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg animate-bounce hover:scale-110 transition-transform duration-300">
                  <BarChart3 size={20} className="text-white" />
                </div>

                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-bounce delay-500 hover:scale-110 transition-transform duration-300">
                  <TrendingUp size={20} className="text-white" />
                </div>

                <div className="absolute top-1/2 -left-6 w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-1000 hover:scale-110 transition-transform duration-300">
                  <Brain size={16} className="text-white" />
                </div>

                <div className="absolute top-1/4 -right-6 w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-700 hover:scale-110 transition-transform duration-300">
                  <Database size={14} className="text-white" />
                </div>
              </div>

              {/* Stats Cards */}
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