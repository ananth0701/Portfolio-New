import React from 'react';
import { ExternalLink, Github, Heart, BarChart3, Brain, TrendingUp, Database, Zap } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Diabetes Prediction Using Machine Learning',
      description: 'Developed a comprehensive diabetes risk prediction model using the Pima Indian Diabetes Dataset. Achieved 96% accuracy through advanced feature engineering and model optimization, reducing false positives by 12% and improving precision by 15%.',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'NumPy', 'Logistic Regression', 'Decision Trees', 'KNN'],
      image: Heart,
      github: 'https://github.com/ananth0710',
      demo: '#',
      featured: true,
      category: 'Healthcare ML',
      metrics: ['96% Accuracy', '12% Reduction in False Positives', '15% Precision Improvement'],
      gradient: 'from-red-500 to-pink-600'
    },
    {
      title: 'Automotive Industry Analytics Dashboard',
      description: 'Built an interactive Tableau dashboard analyzing automotive market trends across fuel types, transmission systems, and ownership patterns. Identified peak dealer sales of ₹625M during 2015-2020 period through comprehensive data analysis.',
      technologies: ['Tableau', 'Data Visualization', 'Business Intelligence', 'Statistical Analysis', 'Market Research'],
      image: BarChart3,
      github: 'https://github.com/ananth0710',
      demo: '#',
      featured: true,
      category: 'Business Analytics',
      metrics: ['₹625M Sales Identified', 'Multi-dimensional Analysis', 'Interactive Filtering'],
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Advanced ML Model Optimization',
      description: 'Comprehensive exploration of advanced machine learning techniques including PCA, ensemble learning, and deep learning applications. Developed optimized models for various business use cases with focus on performance and interpretability.',
      technologies: ['Python', 'Scikit-learn', 'PCA', 'Ensemble Methods', 'Deep Learning', 'Model Optimization'],
      image: Brain,
      github: 'https://github.com/ananth0710',
      demo: '#',
      featured: false,
      category: 'Machine Learning',
      metrics: ['Multiple Algorithms', 'Performance Optimization', 'Model Interpretability'],
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Statistical Data Analysis Suite',
      description: 'Conducted comprehensive exploratory data analysis using Python libraries. Implemented advanced statistical methods for pattern recognition and feature selection, significantly improving model performance across multiple datasets.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Statistical Analysis'],
      image: TrendingUp,
      github: 'https://github.com/ananth0710',
      demo: '#',
      featured: false,
      category: 'Data Analysis',
      metrics: ['Advanced EDA', 'Pattern Recognition', 'Feature Selection'],
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Data Preprocessing Pipeline',
      description: 'Developed robust data preprocessing and feature engineering pipeline to enhance data quality and model performance. Implemented comprehensive data cleaning, normalization, and transformation techniques.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Data Cleaning', 'Feature Engineering', 'Data Validation'],
      image: Database,
      github: 'https://github.com/ananth0710',
      demo: '#',
      featured: false,
      category: 'Data Engineering',
      metrics: ['Automated Pipeline', 'Data Quality Improvement', 'Scalable Architecture'],
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: 'Business Intelligence Dashboard',
      description: 'Created dynamic business intelligence dashboard with real-time data visualization and interactive filtering capabilities. Enabled data-driven decision making through comprehensive market analysis and trend identification.',
      technologies: ['Tableau', 'Data Visualization', 'Business Intelligence', 'Dashboard Design', 'KPI Tracking'],
      image: Zap,
      github: 'https://github.com/ananth0710',
      demo: '#',
      featured: false,
      category: 'Business Intelligence',
      metrics: ['Real-time Updates', 'Interactive Filters', 'KPI Monitoring'],
      gradient: 'from-yellow-500 to-orange-600'
    }
  ];

  const ProjectCard = ({ project, index }: { project: any; index: number }) => (
    <div className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
      project.featured ? 'md:col-span-2 lg:col-span-2' : ''
    }`}>
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${project.gradient} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <project.image size={128} />
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <project.image size={32} />
            </div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-medium rounded-full">
              {project.category}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-white/90 text-sm leading-relaxed">{project.description}</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {project.metrics.map((metric: string, metricIndex: number) => (
            <div key={metricIndex} className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-gray-800">{metric}</div>
            </div>
          ))}
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech: string, techIndex: number) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex space-x-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
          >
            <Github size={16} />
            <span>View Code</span>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of data science projects demonstrating machine learning expertise, 
            statistical analysis, and business intelligence solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in Collaboration?</h3>
            <p className="text-gray-600 mb-6">
              I'm always excited to work on new data science projects and explore innovative solutions. 
              Let's connect and discuss how we can solve complex problems together.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;