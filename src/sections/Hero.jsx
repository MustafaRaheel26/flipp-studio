// src/sections/Hero.jsx - UPDATED
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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
    title: 'DIGITAL INNOVATION',
    subtitle: 'Transforming ideas into exceptional digital experiences'
  },
  {
    id: 2,
    background: project2,
    title: 'CREATIVE DESIGN',
    subtitle: 'Crafting visually stunning and user-centric designs'
  },
  {
    id: 3,
    background: project3,
    title: 'WEB DEVELOPMENT',
    subtitle: 'Building performant and scalable web applications'
  },
  {
    id: 4,
    background: project4,
    title: 'BRAND STRATEGY',
    subtitle: 'Creating memorable brand identities that stand out'
  },
  {
    id: 5,
    background: project5,
    title: 'UI/UX EXCELLENCE',
    subtitle: 'Designing intuitive and engaging user experiences'
  },
  {
    id: 6,
    background: project6,
    title: 'MOTION DESIGN',
    subtitle: 'Bringing stories to life through captivating animation'
  },
  {
    id: 7,
    background: project7,
    title: 'E-COMMERCE SOLUTIONS',
    subtitle: 'Building seamless online shopping experiences'
  },
  {
    id: 8,
    background: project8,
    title: 'MOBILE FIRST',
    subtitle: 'Creating responsive designs for all devices'
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

      {/* Content - UPDATED: Proper center alignment */}
      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)",
              transition: {
                duration: 0.8,
                ease: "easeOut"
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -50, 
              filter: "blur(10px)",
              transition: {
                duration: 0.6,
                ease: "easeIn"
              }
            }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: {
                  delay: 0.2,
                  duration: 0.7,
                  ease: "backOut"
                }
              }}
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: {
                  delay: 0.4,
                  duration: 0.6,
                  ease: "easeOut"
                }
              }}
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: {
                  delay: 0.6,
                  duration: 0.5,
                  ease: "circOut"
                }
              }}
            >
              <Link to="/projects" className="hero-cta">
                EXPLORE OUR WORK
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-scroll">
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}