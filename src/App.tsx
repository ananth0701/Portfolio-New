import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DiabetesProject from './components/DiabetesProject';
import AutomotiveProject from './components/AutomotiveProject';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'diabetes-prediction' | 'automotive-dashboard'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/project/diabetes-prediction') {
        setCurrentPage('diabetes-prediction');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/project/automotive-dashboard') {
        setCurrentPage('automotive-dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
        // Handle scrolling back to specific section on the home page
        if (hash && hash !== '#/' && hash !== '#') {
          setTimeout(() => {
            const targetId = hash.startsWith('#/') ? hash.substring(2) : hash.substring(1);
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial evaluation
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navigation currentPage={currentPage} />
      {currentPage === 'home' ? (
        <>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </>
      ) : currentPage === 'diabetes-prediction' ? (
        <DiabetesProject />
      ) : (
        <AutomotiveProject />
      )}
    </div>
  );
}

export default App;