import React from 'react';
import { Code, Database, BarChart3, Cloud, Users } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Data Science & Analytics',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-600',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      accentColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      skills: [
        { name: 'Statistical Analysis', level: 90 },
        { name: 'Data Preprocessing', level: 88 },
        { name: 'Exploratory Data Analysis', level: 90 },
        { name: 'Machine Learning', level: 85 }
      ]
    },
    {
      title: 'Data Visualization',
      icon: Database,
      color: 'from-indigo-500 to-indigo-600',
      glowColor: 'rgba(99, 102, 241, 0.4)',
      accentColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      skills: [
        { name: 'Tableau', level: 92 },
        { name: 'Power BI', level: 88 },
        { name: 'Microsoft Excel', level: 90 },
        { name: 'Matplotlib & Seaborn', level: 85 }
      ]
    },
    {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      accentColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'R Programming', level: 80 },
        { name: 'SQL', level: 85 },
        { name: 'Java', level: 75 }
      ]
    },
    {
      title: 'Data Analysis Tools',
      icon: Database,
      color: 'from-purple-500 to-purple-600',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      accentColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      skills: [
        { name: 'Pandas & NumPy', level: 90 },
        { name: 'Scikit-learn', level: 85 },
        { name: 'TensorFlow', level: 75 },
        { name: 'Jupyter Notebook', level: 90 }
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: Code,
      color: 'from-orange-500 to-orange-600',
      glowColor: 'rgba(249, 115, 22, 0.4)',
      accentColor: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      skills: [
        { name: 'Google Colab', level: 88 },
        { name: 'Git/GitHub', level: 80 },
        { name: 'Microsoft Office', level: 85 },
        { name: 'Linux', level: 70 },
        { name: 'Cloud Computing', level: 80 }
      ]
    },
    {
      title: 'Soft Skills',
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      glowColor: 'rgba(236, 72, 153, 0.4)',
      accentColor: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      skills: [
        { name: 'Critical Thinking', level: 90 },
        { name: 'Project Management', level: 85 },
        { name: 'Team Collaboration', level: 88 },
        { name: 'Problem Solving', level: 92 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-[#070b13] relative overflow-hidden border-y border-gray-900/50">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 uppercase mb-4 inline-block">
            Skills & Abilities
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 hover:w-32 transition-all duration-300 rounded-full"></div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive toolkit spanning data visualization, data analysis, and cloud technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gray-800/80 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Subtle top-right ambient glow inside card */}
                <div className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-500 pointer-events-none`}></div>

                {/* Header */}
                <div className="p-6 pb-2 flex items-center space-x-4">
                  <div className={`p-3 ${category.bgColor} rounded-xl border border-white/5 shadow-inner transition-all duration-300 group-hover:scale-110`}>
                    <Icon size={24} className={category.accentColor} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-blue-400">{category.title}</h3>
                  </div>
                </div>

                {/* Skills */}
                <div className="p-6 space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2 group/skill">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-200">{skill.name}</span>
                        <span className={`text-sm font-bold ${category.accentColor}`}>{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-950/80 rounded-full h-1.5 overflow-hidden border border-white/5">
                        <div
                          className={`bg-gradient-to-r ${category.color} h-full rounded-full transition-all duration-1000 ease-out transform origin-left`}
                          style={{ 
                            width: `${skill.level}%`,
                            animation: `slideIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${skillIndex * 0.12}s both`,
                            boxShadow: `0 0 8px ${category.glowColor}`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills Summary */}
        <div className="mt-20 relative overflow-hidden bg-gradient-to-r from-gray-900/30 to-gray-900/10 backdrop-blur-md border border-gray-800/80 rounded-3xl p-8 md:p-12">
          {/* Decorative ambient spots */}
          <div className="absolute -left-24 -bottom-24 w-60 h-60 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute -right-24 -top-24 w-60 h-60 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="text-center mb-12 relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">Key Competencies</h3>
            <p className="text-gray-400">Core areas of expertise and ongoing learning</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <div className="group text-center p-6 rounded-2xl bg-gray-950/20 border border-transparent hover:border-gray-800 hover:bg-gray-950/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)] group-hover:scale-110 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 mx-auto mb-4 cursor-pointer">
                <BarChart3 size={30} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
              </div>
              <h4 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">Data Visualization</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Interactive Dashboards & Charts</p>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-gray-950/20 border border-transparent hover:border-gray-800 hover:bg-gray-950/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.05)] group-hover:scale-110 group-hover:border-indigo-400 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 mx-auto mb-4 cursor-pointer">
                <Database size={30} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
              <h4 className="font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">Data Analytics</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Statistical Analysis & EDA</p>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-gray-950/20 border border-transparent hover:border-gray-800 hover:bg-gray-950/40 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] group-hover:scale-110 group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 mx-auto mb-4 cursor-pointer">
                <Database size={30} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
              <h4 className="font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">Data Engineering</h4>
              <p className="text-sm text-gray-400 leading-relaxed">ETL & Data Preprocessing</p>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-gray-950/20 border border-transparent hover:border-gray-800 hover:bg-gray-950/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)] group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 mx-auto mb-4 cursor-pointer">
                <Cloud size={30} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <h4 className="font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">Cloud Computing</h4>
              <p className="text-sm text-gray-400 leading-relaxed">AWS & Google Cloud Platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;