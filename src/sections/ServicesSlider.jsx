// src/sections/ServicesSlider.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  SERVICES_DATA,
  getServicesByCategory,
} from "../data/servicesData";
import "./ServicesSlider.css";

// SVG Icon components matching the ServicesPage
const ServiceIcons = {
  design: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  development: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
    </svg>
  ),
  branding: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16s-1.5-2-4-2-4 2-4 2"/>
      <path d="M9 9h.01M15 9h.01"/>
    </svg>
  ),
  strategy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <path d="M7.5 4.21l4.5 2.6 4.5-2.6M7.5 19.79V14.6L3 12M21 12l-4.5 2.6v5.19M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
    </svg>
  ),
  marketing: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  consulting: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
};

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

  const getServiceIcon = (serviceType) => {
    const IconComponent = ServiceIcons[serviceType] || ServiceIcons.design;
    return <IconComponent className="service-icon" />;
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
                      <div className="service-icon-wrapper">
                        {getServiceIcon(service.type)}
                      </div>
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