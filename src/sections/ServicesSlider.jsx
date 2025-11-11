// src/sections/ServicesSlider.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  SERVICES_DATA,
  getServicesByCategory,
} from "../data/servicesData";
import "./ServicesSlider.css";

export default function ServicesSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Get all services (you can modify this to get specific categories if needed)
  const SERVICES = getServicesByCategory("all");

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || SERVICES.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SERVICES.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, SERVICES.length]);

  // Touch handling for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || SERVICES.length === 0) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const nextSlide = () => {
    if (SERVICES.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % SERVICES.length);
  };

  const prevSlide = () => {
    if (SERVICES.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  const goToSlide = (index) => {
    if (SERVICES.length === 0) return;
    setCurrentSlide(index);
  };

  if (SERVICES.length === 0) {
    return null; // or loading state
  }

  const currentService = SERVICES[currentSlide];

  return (
    <section className="services-section">
      <div className="services-inner">
        <div className="services-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            OUR SERVICES
          </motion.h2>
        </div>

        <div className="services-content">
          {/* Text Content */}
          <motion.div 
            className="services-text"
            key={currentSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="service-title">{currentService.title}</h3>
            <p className="service-description">{currentService.description}</p>
            
            <ul className="service-features">
              {currentService.features && currentService.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            
            <div className="service-meta">
              <span className="service-duration">{currentService.duration}</span>
              <span className="service-price">{currentService.priceRange}</span>
            </div>
          </motion.div>

          {/* Slider */}
          <div 
            className="services-slider"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="slider-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="slider-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {SERVICES.map((service, index) => (
                  <div key={service.id} className="slider-slide">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="slider-image"
                    />
                    <div className="slide-overlay">
                      <h3 className="slide-title">{service.title}</h3>
                    </div>
                    <Link 
                      to={`/services/${service.slug}`} 
                      className="view-details-btn"
                    >
                      VIEW DETAILS
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="slider-nav">
              <button className="slider-arrow" onClick={prevSlide}>
                ‹
              </button>
              
              <div className="slider-dots">
                {SERVICES.map((_, index) => (
                  <button
                    key={index}
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
              
              <button className="slider-arrow" onClick={nextSlide}>
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}