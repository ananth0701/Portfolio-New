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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <Database size={80} className="text-white" />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-4">
                <span className="block">Ananthnath</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Erukulla
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xl sm:text-2xl text-slate-700 mb-6">
                <span>Data Visualization Expert</span>
                <span className="hidden sm:block">•</span>
                <span>Data Science Enthusiast</span>
                <span className="hidden sm:block">•</span>
                <span>Analytics Specialist</span>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transforming complex data into compelling visual stories and actionable insights through advanced analytics and data visualization. 
              Passionate about creating data-driven solutions that drive business impact and innovation.
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
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
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Explore My Work
                <ArrowDown size={20} className="ml-2 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
              
              <a
                href="https://github.com/ananth0701"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-full font-semibold hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download size={20} className="mr-2" />
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mt-8">
              <a
                href="https://github.com/ananth0701"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Github size={24} className="text-slate-700" />
              </a>
              <a
                href="https://linkedin.com/in/ananthnatherukulla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Linkedin size={24} className="text-slate-700" />
              </a>
              <a
                href="mailto:ananthnatherukulla@gmail.com"
                className="p-4 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Mail size={24} className="text-slate-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;