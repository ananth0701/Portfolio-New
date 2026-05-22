import React, { useState, useEffect } from 'react';
import { Menu, X, Database } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'diabetes-prediction' | 'automotive-dashboard';
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' }
];

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (currentPage !== 'home') return;

      // Extract document zoom to scale scroll coordinates appropriately
      const zoom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('zoom')) || 1;
      const scrollPosition = window.scrollY / zoom;
      const viewportHeight = window.innerHeight / zoom;

      // Check if user has scrolled to the bottom of the page
      if (viewportHeight + scrollPosition >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      let currentSection = 'home';
      for (const link of navLinks) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120; // 120px offset to activate section slightly before it hits top of viewport
          if (scrollPosition >= top) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    // Run once on load/mount/page change
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const scrollToSection = (href: string) => {
    if (currentPage !== 'home') {
      window.location.hash = href;
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            onClick={() => {
              if (currentPage !== 'home') {
                window.location.hash = '#home';
              } else {
                scrollToSection('#home');
              }
            }}
            className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-80 transition-all"
          >
            <Database size={24} className="text-blue-500 mr-2" />
            <span className="text-xl font-bold text-white">Ananthnath Erukulla</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => {
                const isActive = currentPage === 'home' && activeSection === link.href.substring(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 border border-transparent hover:scale-105'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 shadow-lg border-t border-gray-800">
            {navLinks.map((link) => {
              const isActive = currentPage === 'home' && activeSection === link.href.substring(1);
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`block py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 ${
                    isActive
                      ? 'text-blue-400 bg-blue-500/10 border-l-4 border-l-blue-500 pl-3 rounded-l-none rounded-r-lg'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 border-l-4 border-transparent pl-3'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;