import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Database, Download, Phone } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm">
              <Database size={80} className="text-white" />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
                <span className="block">Ananthnath</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Erukulla
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xl sm:text-2xl text-purple-200 mb-6">
                <span>Data Science Enthusiast</span>
                <span className="hidden sm:block">•</span>
                <span>ML Engineer</span>
                <span className="hidden sm:block">•</span>
                <span>CSE Student</span>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transforming complex data into actionable insights through machine learning and statistical analysis. 
              Passionate about building intelligent solutions that solve real-world business challenges.
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>ananthnatherukulla@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91-6301658065</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button
                onClick={scrollToAbout}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Explore My Work
                <ArrowDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
              
              <a
                href="https://github.com/ananth0710"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <Download size={20} className="mr-2" />
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mt-8">
              <a
                href="https://github.com/ananth0710"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <Github size={24} className="text-white" />
              </a>
              <a
                href="https://linkedin.com/in/ananthnatherukulla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <Linkedin size={24} className="text-white" />
              </a>
              <a
                href="mailto:ananthnatherukulla@gmail.com"
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <Mail size={24} className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;