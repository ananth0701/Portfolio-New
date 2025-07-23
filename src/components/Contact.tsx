import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, FileText, Calendar, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = formData.subject || 'Contact from Portfolio Website';
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:ananthnatherukulla@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Let's Connect</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6 hover:w-32 transition-all duration-300"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to collaborate on exciting data science projects or discuss opportunities? 
            I'd love to hear from you and explore how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Whether you're looking for a data science intern, want to collaborate on research projects, 
                or discuss the latest in machine learning and analytics, I'm always excited to connect 
                with fellow data enthusiasts, recruiters, and industry professionals.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="group bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Email Address</p>
                    <a href="mailto:ananthnatherukulla@gmail.com" className="text-white font-semibold hover:text-purple-400 transition-colors">
                      ananthnatherukulla@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-700/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Phone Number</p>
                    <a href="tel:+916301658065" className="text-white font-semibold hover:text-blue-400 transition-colors">
                      +91-6301658065
                    </a>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Location</p>
                    <p className="text-white font-semibold">Hyderabad, Telangana, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://github.com/ananth0701"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-4 bg-gray-900 text-white rounded-xl hover:bg-gray-700 hover:scale-105 transition-all duration-200"
                >
                  <FileText size={20} />
                  <span className="font-medium">Resume</span>
                </a>
                <a
                  href="mailto:ananthnatherukulla@gmail.com?subject=Meeting Request"
                  className="flex items-center justify-center space-x-2 p-4 border-2 border-purple-500 text-purple-400 rounded-xl hover:bg-purple-600 hover:text-white hover:scale-105 transition-all duration-200"
                >
                  <Calendar size={20} />
                  <span className="font-medium">Schedule</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Connect on Social</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/ananth0701"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-xl hover:bg-gray-600 hover:scale-110 transition-all duration-200"
                >
                  <Github size={24} className="text-gray-300" />
                </a>
                <a
                  href="https://linkedin.com/in/ananthnatherukulla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-900/30 rounded-xl hover:bg-blue-800/40 hover:scale-110 transition-all duration-200"
                >
                  <Linkedin size={24} className="text-blue-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-xl p-8 border border-gray-700 hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-500 transition-all duration-200 bg-gray-700 text-white"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-500 transition-all duration-200 bg-gray-700 text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-500 transition-all duration-200 bg-gray-700 text-white"
                    placeholder="Enter your subject (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-500 transition-all duration-200 bg-gray-700 text-white resize-none"
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;