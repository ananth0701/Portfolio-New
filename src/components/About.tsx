import React from 'react';
import { User, GraduationCap, Calendar, MapPin, Award, BookOpen, Code, Database, BarChart3 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 hover:w-32 transition-all duration-300"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate Computer Science Engineering student specializing in Data Science, 
            with expertise in machine learning, statistical analysis, and data visualization.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Story */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">My Journey</h3>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm a dedicated Computer Science Engineering student at Lovely Professional University, 
                  specializing in Data Science with a passion for transforming complex data into actionable insights. 
                  My journey in data science began with a fascination for patterns and the stories that data can tell.
                </p>
                <p>
                  Currently maintaining a CGPA of 7.1/10, I've focused my studies on machine learning algorithms, 
                  statistical analysis, and data visualization techniques. Through hands-on projects and continuous 
                  learning, I've developed expertise in Python, R, Tableau, and various ML frameworks.
                </p>
                <p>
                  My goal is to leverage data science to solve real-world problems and drive meaningful business 
                  decisions. I'm particularly interested in healthcare analytics, business intelligence, and 
                  predictive modeling applications.
                </p>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Code className="w-6 h-6 text-purple-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Core Expertise</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 hover:scale-105 transition-all duration-300">
                  <Database className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">Data Analysis</h4>
                  <p className="text-sm text-gray-400">Python, Pandas, NumPy, Statistical Analysis</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 hover:scale-105 transition-all duration-300">
                  <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">Visualization</h4>
                  <p className="text-sm text-gray-400">Tableau, Power BI, Matplotlib, Seaborn</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 hover:scale-105 transition-all duration-300">
                  <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-2">Machine Learning</h4>
                  <p className="text-sm text-gray-400">Scikit-learn, TensorFlow, Model Optimization</p>
                </div>
              </div>
            </div>

            {/* Interests & Goals */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-6">
                <BookOpen className="w-6 h-6 text-indigo-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Interests & Future Goals</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Research Interests</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                      Healthcare Data Analytics
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                      Predictive Modeling
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                      Business Intelligence
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                      Deep Learning Applications
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Career Aspirations</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Data Scientist Role
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      ML Engineer Position
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Research & Development
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Industry Innovation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              {/* Profile Image */}
              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
                  <User className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ananthnath Erukulla</h3>
                <p className="text-gray-400">Data Science Student</p>
              </div>

              {/* Quick Info */}
              <div className="space-y-4">
                <div className="hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center text-gray-300">
                    <GraduationCap className="w-5 h-5 text-blue-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">CGPA</p>
                      <p className="font-medium text-white">7.1/10.0</p>
                    </div>
                  </div>
                </div>

                <div className="hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 text-green-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Expected Graduation</p>
                      <p className="font-medium text-white">July 2026</p>
                    </div>
                  </div>
                </div>

                <div className="hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center text-gray-300">
                    <Award className="w-5 h-5 text-yellow-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Specialization</p>
                      <p className="font-medium text-white">Data Science</p>
                    </div>
                  </div>
                </div>

                <div className="hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 text-red-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="font-medium text-white">Hyderabad, Telangana</p>
                    </div>
                  </div>
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