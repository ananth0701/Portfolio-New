import React from 'react';
import { Code, Database, BarChart3, Brain, Cloud, Users } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-purple-500 to-purple-600',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'R Programming', level: 80 },
        { name: 'SQL', level: 75 }
      ]
    },
    {
      title: 'Machine Learning',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      skills: [
        { name: 'Scikit-learn', level: 88 },
        { name: 'Pandas & NumPy', level: 90 },
        { name: 'TensorFlow/Keras', level: 75 },
        { name: 'Statistical Analysis', level: 85 }
      ]
    },
    {
      title: 'Data Visualization',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-600',
      skills: [
        { name: 'Tableau', level: 92 },
        { name: 'Power BI', level: 88 },
        { name: 'Matplotlib', level: 90 },
        { name: 'Seaborn', level: 88 },
        { name: 'Plotly', level: 85 },
        { name: 'D3.js', level: 75 }
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: Database,
      color: 'from-orange-500 to-orange-600',
      skills: [
        { name: 'Jupyter Notebook', level: 90 },
        { name: 'Google Colab', level: 88 },
        { name: 'Git/GitHub', level: 80 },
        { name: 'Microsoft Office', level: 85 }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'from-indigo-500 to-indigo-600',
      skills: [
        { name: 'AWS Basics', level: 70 },
        { name: 'Google Cloud', level: 65 },
        { name: 'Docker', level: 60 },
        { name: 'Linux', level: 75 }
      ]
    },
    {
      title: 'Soft Skills',
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      skills: [
        { name: 'Critical Thinking', level: 90 },
        { name: 'Project Management', level: 85 },
        { name: 'Team Collaboration', level: 88 },
        { name: 'Problem Solving', level: 92 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Technical Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive toolkit spanning machine learning, data analysis, visualization, and cloud technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              {/* Header */}
              <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <category.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
              </div>

              {/* Skills */}
              <div className="p-6 space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{skill.name}</span>
                      <span className="text-sm font-bold text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${category.color} h-full rounded-full transition-all duration-1000 ease-out transform origin-left`}
                        style={{ 
                          width: `${skill.level}%`,
                          animation: `slideIn 1s ease-out ${skillIndex * 0.1}s both`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Competencies</h3>
            <p className="text-gray-600">Core areas of expertise and ongoing learning</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain size={32} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Machine Learning</h4>
              <p className="text-sm text-gray-600">Supervised & Unsupervised Learning</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={32} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Data Analytics</h4>
              <p className="text-sm text-gray-600">Statistical Analysis & EDA</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database size={32} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Data Engineering</h4>
              <p className="text-sm text-gray-600">ETL & Data Preprocessing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud size={32} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Cloud Computing</h4>
              <p className="text-sm text-gray-600">AWS & Google Cloud Platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;