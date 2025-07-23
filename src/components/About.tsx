import React from 'react';
import { User, GraduationCap, Calendar, MapPin, Mail, Phone, Github, Linkedin, Award, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate data scientist with a strong foundation in machine learning, statistical analysis, 
            and data visualization. Currently pursuing advanced studies while building practical experience 
            in real-world data science applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Story */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">My Journey</h3>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>
                  My fascination with data began during my undergraduate studies when I discovered 
                  the power of extracting meaningful insights from complex datasets. What started as 
                  curiosity has evolved into a passion for using data science to solve real-world problems.
                </p>
                <p>
                  I believe in the transformative power of data-driven decision making and am constantly 
                  exploring new methodologies and technologies to stay at the forefront of this rapidly 
                  evolving field.
                </p>
                <p>
                  When I'm not analyzing data or building models, you can find me contributing to open-source 
                  projects, participating in data science competitions, or sharing knowledge with the community 
                  through blog posts and presentations.
                </p>
              </div>
            </div>

            {/* Interests & Hobbies */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-6">
                <BookOpen className="w-6 h-6 text-purple-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Interests & Hobbies</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Professional Interests</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Machine Learning & AI
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Deep Learning
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Natural Language Processing
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Computer Vision
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Personal Hobbies</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Photography
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Hiking & Nature
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Reading Tech Blogs
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Chess
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              {/* Profile Image */}
              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <User className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Data Science Student</h3>
                <p className="text-gray-400">Aspiring ML Engineer</p>
              </div>

              {/* Quick Info */}
              <div className="space-y-6">
                <div className="hover:bg-gray-700 p-3 rounded-lg transition-colors duration-300">
                  <div className="flex items-center text-gray-300">
                    <GraduationCap className="w-5 h-5 text-blue-400 mr-3 hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-sm text-gray-400">CGPA</p>
                      <p className="font-medium text-white">8.5/10.0</p>
                    </div>
                  </div>
                </div>

                <div className="hover:bg-gray-700 p-3 rounded-lg transition-colors duration-300">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 text-green-400 mr-3 hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-sm text-gray-400">Expected Graduation</p>
                      <p className="font-medium text-white">May 2025</p>
                    </div>
                  </div>
                </div>

                <div className="hover:bg-gray-700 p-3 rounded-lg transition-colors duration-300">
                  <div className="flex items-center text-gray-300">
                    <Award className="w-5 h-5 text-yellow-400 mr-3 hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-sm text-gray-400">Specialization</p>
                      <p className="font-medium text-white">Machine Learning</p>
                    </div>
                  </div>
                </div>

                <div className="hover:bg-gray-700 p-3 rounded-lg transition-colors duration-300">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 text-red-400 mr-3 hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="font-medium text-white">New York, USA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Links */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-lg font-medium text-white mb-4">Get In Touch</h4>
                <div className="space-y-3">
                  <a 
                    href="mailto:contact@example.com" 
                    className="flex items-center text-gray-300 hover:text-blue-400 hover:bg-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Mail className="w-4 h-4 mr-3" />
                    <span className="text-sm">contact@example.com</span>
                  </a>
                  <a 
                    href="tel:+1234567890" 
                    className="flex items-center text-gray-300 hover:text-green-400 hover:bg-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Phone className="w-4 h-4 mr-3" />
                    <span className="text-sm">+1 (234) 567-890</span>
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-purple-400 hover:bg-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-4 h-4 mr-3" />
                    <span className="text-sm">GitHub Profile</span>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-blue-400 hover:bg-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Linkedin className="w-4 h-4 mr-3" />
                    <span className="text-sm">LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;