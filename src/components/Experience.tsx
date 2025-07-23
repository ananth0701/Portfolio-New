import React from 'react';
import { Briefcase, Calendar, MapPin, GraduationCap } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Data Science Using Machine Learning',
      company: 'Summer Training Program',
      location: 'Remote',
      period: 'June 2024 – July 2024',
      type: 'training',
      description: [
        'Processed & analyzed datasets using Python (Pandas, NumPy, Matplotlib) to extract meaningful insights',
        'Built ML models including KNN, Decision Trees, Logistic Regression, and SVM with EDA & statistical methods',
        'Explored advanced ML techniques including PCA, ensemble learning, and deep learning applications',
        'Developed a capstone project applying machine learning to solve real-world business problems'
      ]
    },
    {
      title: 'Competitive Programming & Hackathons',
      company: 'Various Competitions',
      location: 'India',
      period: '2019 - 2024',
      type: 'academic',
      description: [
        'Achieved 2nd position in IoT competition demonstrating technical innovation and problem-solving skills',
        'Received recognition for participation in Cyber-Security Hackathon showcasing security expertise',
        'Completed 10+ professional development courses on Coursera enhancing technical and analytical skills',
        'Earned Elite certification in Cloud Computing from NPTEL demonstrating advanced technical knowledge'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Technology - Computer Science and Engineering',
      school: 'Lovely Professional University',
      location: 'Phagwara, Punjab',
      period: '2022 - 2026',
      details: [
        'CGPA: 7.1/10',
        'Specialization: Data Science and Machine Learning',
        'Relevant Coursework: Data Structures, Algorithms, Database Management, Software Engineering'
      ]
    },
    {
      degree: 'Intermediate in Math, Physics and Chemistry',
      school: 'Sri Chaithanya Junior Kalashala',
      location: 'Hyderabad, Telangana',
      period: '2020 - 2022',
      details: [
        'Percentage: 70%',
        'Strong foundation in Mathematics and Physics',
        'Developed analytical and problem-solving skills essential for data science'
      ]
    },
    {
      degree: 'Matriculation (Class X)',
      school: 'Delhi Public School',
      location: 'Hyderabad, Telangana',
      period: '2019 - 2020',
      details: [
        'Percentage: 77.80%',
        'Strong academic foundation in core subjects',
        'Developed fundamental analytical and mathematical skills'
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'training': return 'bg-blue-600';
      case 'project': return 'bg-purple-600';
      case 'academic': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Experience & Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 hover:w-32 transition-all duration-300"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My academic journey and professional experience in data science and machine learning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <Briefcase size={24} className="mr-3 text-purple-600" />
              Professional Experience
            </h3>
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-purple-600/30"></div>
              
              {experiences.map((exp, index) => (
                <div key={index} className="relative mb-12 last:mb-0">
                  <div className={`absolute left-6 w-4 h-4 ${getTypeColor(exp.type)} rounded-full border-4 border-gray-900 shadow-lg`}></div>
                  
                  <div className="ml-20 bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 border border-gray-700 hover:border-blue-500/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-1">
                          {exp.title}
                        </h4>
                        <p className="text-lg text-purple-600 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end text-sm text-gray-400 mt-2 sm:mt-0">
                        <div className="flex items-center mb-1">
                          <Calendar size={16} className="mr-1" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <GraduationCap size={24} className="mr-3 text-blue-600" />
              Education
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 border border-gray-700 hover:border-indigo-500/50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">
                        {edu.degree}
                      </h4>
                      <p className="text-lg text-blue-600 font-medium">
                        {edu.school}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end text-sm text-gray-400 mt-2 sm:mt-0">
                      <div className="flex items-center mb-1">
                        <Calendar size={16} className="mr-1" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {edu.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;