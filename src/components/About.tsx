import React from 'react';
import { GraduationCap, Brain, TrendingUp, Award, MapPin, Calendar } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A passionate data science student dedicated to transforming complex data into actionable insights 
            through innovative machine learning solutions and statistical analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Info Cards */}
          <div className="space-y-8">
            <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Academic Excellence</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Currently pursuing B.Tech in Computer Science Engineering at Lovely Professional University 
                    with a strong focus on data science, machine learning, and statistical modeling. 
                    Maintaining consistent academic performance while actively engaging in practical projects.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-purple-600 font-medium">
                    <MapPin size={16} className="mr-2" />
                    Lovely Professional University, Punjab
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Brain size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Technical Expertise</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Specialized in machine learning algorithms, data preprocessing, and statistical analysis. 
                    Proficient in Python, R, and various ML frameworks including Scikit-learn, Pandas, and NumPy. 
                    Experienced in building predictive models and data visualization dashboards.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Python</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Machine Learning</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Data Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Project Impact</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Developed high-impact projects including a diabetes prediction model with 96% accuracy 
                    and comprehensive automotive industry analytics dashboard. Focused on solving real-world 
                    business problems through data-driven solutions and advanced statistical methods.
                  </p>
                  <div className="mt-4 text-sm text-green-600 font-medium">
                    96% Model Accuracy • 12% Reduction in False Positives
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Recognition & Growth</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Elite certification in Cloud Computing (NPTEL), 2nd position in IoT competition, 
                    and recognition in Cyber-Security Hackathon. Completed 10+ professional development 
                    courses and multiple certifications from Coursera and IBM.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-orange-600 font-medium">
                    <Award size={16} className="mr-2" />
                    Elite NPTEL Certification • 10+ Coursera Courses
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Card */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl mb-6">
                  <Brain size={60} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ananthnath Erukulla</h3>
                <p className="text-lg text-purple-600 font-medium mb-6">Data Science Student</p>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Current CGPA</span>
                      <span className="font-bold text-gray-900">6.93/10</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Expected Graduation</span>
                      <span className="font-bold text-gray-900">July 2026</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Specialization</span>
                      <span className="font-bold text-gray-900">Data Science & ML</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600">10+</div>
                    <div className="text-sm text-gray-600">Certifications</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">6+</div>
                    <div className="text-sm text-gray-600">Projects</div>
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