import React from 'react';
import { ExternalLink, Github, Heart, BarChart3, Database, Award, Brain, TrendingUp } from 'lucide-react';

const Projects = () => {
  const featuredProjects = [
    {
      title: 'Diabetes Prediction Using Machine Learning',
      description: 'Developed a comprehensive diabetes risk prediction model using the Pima Indian Diabetes Dataset. Achieved 96% accuracy through advanced feature engineering and model optimization, reducing false positives by 12% and improving precision by 15%.',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'NumPy', 'Logistic Regression', 'Decision Trees', 'KNN'],
      image: Heart,
      github: 'https://github.com/ananth0701',
      demo: '#',
      category: 'Healthcare ML',
      metrics: ['96% Accuracy', '12% Reduction in False Positives', '15% Precision Improvement'],
      gradient: 'from-rose-500 to-pink-600',
      impact: 'High-accuracy healthcare prediction model with significant clinical implications'
    },
    {
      title: 'Automotive Industry Analytics Dashboard',
      description: 'Built an interactive Tableau dashboard analyzing automotive market trends across fuel types, transmission systems, and ownership patterns. Identified peak dealer sales of ₹625M during 2015-2020 period through comprehensive data analysis.',
      technologies: ['Tableau', 'Data Visualization', 'Business Intelligence', 'Statistical Analysis', 'Market Research'],
      image: BarChart3,
      github: 'https://github.com/ananth0701',
      demo: '#',
      category: 'Business Analytics',
      metrics: ['₹625M Sales Identified', 'Multi-dimensional Analysis', 'Interactive Filtering'],
      gradient: 'from-blue-500 to-indigo-600',
      impact: 'Comprehensive market analysis enabling data-driven business decisions'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of data science projects demonstrating data visualization expertise, 
            statistical analysis, and advanced analytics solutions
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <Award className="text-amber-500 mr-3" size={28} />
            <h3 className="text-2xl font-bold text-white">Flagship Projects</h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="group relative bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-3 border border-gray-700 hover:border-blue-500/50">
                {/* Header with enhanced gradient */}
                <div className={`bg-gradient-to-br ${project.gradient} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-40 h-40 opacity-10 transform rotate-12">
                    <project.image size={160} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
                        <project.image size={36} />
                      </div>
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-sm font-semibold rounded-full border border-white/30">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-white/95 leading-relaxed mb-4">{project.description}</p>
                    <p className="text-white/80 text-sm italic">{project.impact}</p>
                  </div>
                </div>
                
                {/* Enhanced Content */}
                <div className="p-8">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl p-6 border border-gray-600 hover:from-gray-600 hover:to-gray-500 hover:border-blue-500/50 transition-all duration-300">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Key Achievements</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {project.metrics.map((metric: string, metricIndex: number) => (
                          <div key={metricIndex} className="text-center">
                            <div className="text-lg font-bold text-white">{metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-4 py-2 bg-blue-900/30 text-blue-300 text-sm font-medium rounded-full border border-blue-700 hover:bg-blue-800/40 hover:scale-105 hover:border-blue-500 transition-all duration-300 cursor-pointer"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-700 hover:scale-105 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
                    >
                      <Github size={18} />
                      <span>View Source</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700 hover:border-blue-500 hover:scale-105 transition-all duration-200 text-sm font-semibold"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gray-800 rounded-3xl shadow-xl p-10 max-w-3xl mx-auto border border-gray-700 hover:shadow-2xl hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Database size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Collaborate?</h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              I'm passionate about solving complex data challenges and creating impactful visualizations. 
              Let's connect and explore how we can transform data into actionable insights together.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;