import React from 'react';
import { ExternalLink, Github, Heart, BarChart3, Brain, TrendingUp, Database, Zap, Award } from 'lucide-react';

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

  const otherProjects = [
    {
      title: 'Advanced ML Model Optimization',
      description: 'Comprehensive exploration of advanced machine learning techniques including PCA, ensemble learning, and deep learning applications.',
      technologies: ['Python', 'Scikit-learn', 'PCA', 'Ensemble Methods', 'Deep Learning'],
      image: Brain,
      github: 'https://github.com/ananth0701',
      category: 'Machine Learning',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      title: 'Statistical Data Analysis Suite',
      description: 'Conducted comprehensive exploratory data analysis using Python libraries with advanced statistical methods for pattern recognition.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Statistical Analysis'],
      image: TrendingUp,
      github: 'https://github.com/ananth0701',
      category: 'Data Analysis',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Data Preprocessing Pipeline',
      description: 'Developed robust data preprocessing and feature engineering pipeline to enhance data quality and model performance.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Data Cleaning', 'Feature Engineering'],
      image: Database,
      github: 'https://github.com/ananth0701',
      category: 'Data Engineering',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      title: 'Business Intelligence Dashboard',
      description: 'Created dynamic business intelligence dashboard with real-time data visualization and interactive filtering capabilities.',
      technologies: ['Tableau', 'Data Visualization', 'Business Intelligence', 'Dashboard Design'],
      image: Zap,
      github: 'https://github.com/ananth0701',
      category: 'Business Intelligence',
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A showcase of data science projects demonstrating machine learning expertise, 
            statistical analysis, and advanced data visualization solutions
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <Award className="text-amber-500 mr-3" size={28} />
            <h3 className="text-2xl font-bold text-slate-800">Flagship Projects</h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-slate-200">
                {/* Header with enhanced gradient */}
                <div className={`bg-gradient-to-br ${project.gradient} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-40 h-40 opacity-10 transform rotate-12">
                    <project.image size={160} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
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
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                      <h4 className="text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wide">Key Achievements</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {project.metrics.map((metric: string, metricIndex: number) => (
                          <div key={metricIndex} className="text-center">
                            <div className="text-lg font-bold text-slate-800">{metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wide">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200 hover:bg-blue-200 transition-colors"
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
                      className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
                    >
                      <Github size={18} />
                      <span>View Source</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 text-sm font-semibold"
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

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Additional Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProjects.map((project, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200">
                {/* Compact Header */}
                <div className={`bg-gradient-to-r ${project.gradient} p-6 text-white relative`}>
                  <div className="absolute top-2 right-2 opacity-20">
                    <project.image size={48} />
                  </div>
                  <div className="relative z-10">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm inline-block mb-3">
                      <project.image size={24} />
                    </div>
                    <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* Compact Content */}
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{project.description}</p>
                  
                  {/* Technologies - Limited */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-md">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* Action */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 text-sm font-medium"
                  >
                    <Github size={16} />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto border border-slate-200">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Database size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to Collaborate?</h3>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
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