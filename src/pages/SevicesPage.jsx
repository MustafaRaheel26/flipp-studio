// src/pages/ServicesPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AdvancedFooter from "../components/AdvancedFooter";
import {
  SERVICES_DATA,
  getServicesByCategory,
  SERVICE_CATEGORIES,
} from "../data/servicesData";
import "./ServicesPage.css";

// Clean SVG Icon components (no emojis)
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

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [currentServices, setCurrentServices] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    setCurrentServices(getServicesByCategory(activeCategory));
  }, []);

  const handleCategoryChange = (categoryId) => {
    setIsLoading(true);
    setActiveCategory(categoryId);

    setTimeout(() => {
      const services = getServicesByCategory(categoryId);
      setCurrentServices(services);
      setIsLoading(false);
    }, 400);
  };

  const getServiceIcon = (serviceType) => {
    const IconComponent = ServiceIcons[serviceType] || ServiceIcons.design;
    return <IconComponent className="service-icon" />;
  };

  return (
    <motion.div
      className="services-main-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Page Header */}
      <section className="services-header">
        <motion.div
          className="header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">OUR SERVICES</h1>
          <p className="page-subtitle">
            Comprehensive design solutions tailored to your vision and needs. 
            From concept to execution, we deliver exceptional results that drive success.
          </p>
        </motion.div>
      </section>

      {/* Sticky Category Slider */}
      <section className="categories-section">
        <div className="categories-container" ref={sliderRef}>
          {SERVICE_CATEGORIES.map((category, index) => (
            <motion.button
              key={category.id}
              className={`category-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-text">
                {category.name.split("").map((letter, i) => (
                  <span key={i} className="btn-letter">
                    {letter}
                  </span>
                ))}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loading-spinner"
            >
              <div className="spinner"></div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              className="services-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentServices.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index}
                  getServiceIcon={getServiceIcon}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <AdvancedFooter />
    </motion.div>
  );
};

const ServiceCard = ({ service, index, getServiceIcon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/services/${service.slug}`} className="service-card-link">
        <div className="service-image-container">
          <img src={service.image} alt={service.title} className="service-image" />
          <div className="service-overlay">
            <div className="service-icon-wrapper">
              {getServiceIcon(service.type)}
            </div>
            <div className="service-info">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-meta">
                <span className="service-duration">{service.duration}</span>
                <span className="service-price">{service.priceRange}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* View More Button */}
        <motion.button 
          className="view-more-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.3 }}
        >
          EXPLORE →
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default ServicesPage;