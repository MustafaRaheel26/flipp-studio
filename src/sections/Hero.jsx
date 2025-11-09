// src/sections/Hero.jsx - UPDATED
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

// Import images from assets folder
import project1 from '../assets/Projects-1.jpeg';
import project2 from '../assets/Projects-2.jpeg';
import project3 from '../assets/Projects-3.jpeg';
import project4 from '../assets/Projects-4.jpeg';
import project5 from '../assets/Projects-5.jpeg';
import project6 from '../assets/Projects-6.jpeg';
import project7 from '../assets/Projects-7.jpeg';
import project8 from '../assets/Projects-8.jpeg';

const heroSlides = [
  {
    id: 1,
    background: project1,
    title: 'We Design Bespoke Solutions For Architecture And Interior Designs'
  },
  {
    id: 2,
    background: project2,
    title: 'We Design Bespoke Solutions For Architecture And Interior Designs'
  },
  {
    id: 3,
    background: project3,
    title: 'We Design Bespoke Solutions For Architecture And Interior Designs'
  },
  {
    id: 4,
    background: project4,
    title: 'We Design Bespoke Solutions For Architecture And Interior Designs'
  },
  {
    id: 5,
    background: project5,
    title: 'We Design Bespoke Solutions For Architecture And Interior Designs'
  },
  {
    id: 6,
    background: project6,
    title: 'We Design Bespoke Solutions For Architecture And Interior Designs'
  },
  {
    id: 7,
    background: project7,
    title: 'We Design Bespoke Solutions For Architecture And Interior Designs'
  },
  {
    id: 8,
    background: project8,
    title: 'We Design Bespoke Solutions For Architecture And Interior Designs'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      {/* Background Slides */}
      <AnimatePresence>
        {heroSlides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              className="hero-bg"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              <img src={slide.background} alt={slide.title} />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Content - UPDATED: Removed button and centered text only */}
      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ 
              opacity: 0, 
              y: 80, 
              rotateX: 45,
              scale: 0.9,
              filter: "blur(15px)"
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                duration: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -80, 
              rotateX: -45,
              scale: 1.1,
              filter: "blur(15px)",
              transition: {
                duration: 0.7,
                ease: "easeIn"
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              textAlign: 'center'
            }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ 
                scale: 0.8, 
                opacity: 0,
                y: 60,
                rotateY: 30 
              }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: 0,
                rotateY: 0,
                transition: {
                  delay: 0.1,
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }
              }}
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-scroll">
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}