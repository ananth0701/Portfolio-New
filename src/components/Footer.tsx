import React from 'react';
import { Github, Linkedin, Mail, Heart, FileText, Calendar } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ananthnath Erukulla</h3>
            <p className="text-gray-300 mb-4">
              Computer Science Engineering student passionate about data science, machine learning, and solving real-world problems through intelligent analytics.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ananth0710"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/ananthnatherukulla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:ananthnatherukulla@gmail.com"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Experience
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <FileText size={16} className="mr-2" />
                <a href="https://github.com/ananth0710" className="hover:text-white transition-colors duration-200">
                  Resume/CV
                </a>
              </li>
              <li className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <a href="mailto:ananthnatherukulla@gmail.com" className="hover:text-white transition-colors duration-200">
                  Schedule Meeting
                </a>
              </li>
              <li>Coursera Certifications</li>
              <li>GitHub Projects</li>
              <li>LinkedIn Profile</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Made with{' '}
            <Heart size={16} className="text-red-500 mx-1" />
            © {currentYear} Ananthnath Erukulla. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;