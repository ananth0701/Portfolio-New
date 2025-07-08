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
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a backend service
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Let's Connect</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to collaborate on exciting data science projects or discuss opportunities? 
            I'd love to hear from you and explore how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you're looking for a data science intern, want to collaborate on research projects, 
                or discuss the latest in machine learning and analytics, I'm always excited to connect 
                with fellow data enthusiasts, recruiters, and industry professionals.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="group bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                    <a href="mailto:ananthnatherukulla@gmail.com" className="text-gray-900 font-semibold hover:text-purple-600 transition-colors">
                      ananthnatherukulla@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Phone Number</p>
                    <a href="tel:+916301658065" className="text-gray-900 font-semibold hover:text-blue-600 transition-colors">
                      +91-6301658065
                    </a>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                    <p className="text-gray-900 font-semibold">Hyderabad, Telangana, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://github.com/ananth0710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200"
                >
                  <FileText size={20} />
                  <span className="font-medium">Resume</span>
                </a>
                <a
                  href="mailto:ananthnatherukulla@gmail.com?subject=Meeting Request"
                  className="flex items-center justify-center space-x-2 p-4 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-colors duration-200"
                >
                  <Calendar size={20} />
                  <span className="font-medium">Schedule</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Connect on Social</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/ananth0710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                >
                  <Github size={24} className="text-gray-700" />
                </a>
                <a
                  href="https://linkedin.com/in/ananthnatherukulla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors duration-200"
                >
                  <Linkedin size={24} className="text-blue-700" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="internship">Internship Opportunity</option>
                    <option value="collaboration">Project Collaboration</option>
                    <option value="consultation">Data Science Consultation</option>
                    <option value="networking">Professional Networking</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
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