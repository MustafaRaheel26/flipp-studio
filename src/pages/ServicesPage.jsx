// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AdvancedFooter from "../components/AdvancedFooter";
import { SERVICES_DATA } from "../data/servicesData";
import "./ServicesPage.css";

// Clean SVG Icon components (no emojis)
const ServiceIcons = {
  design: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  architecture: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <path d="M7.5 4.21l4.5 2.6 4.5-2.6M7.5 19.79V14.6L3 12M21 12l-4.5 2.6v5.19M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
    </svg>
  ),
  branding: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16s-1.5-2-4-2-4 2-4 2"/>
      <path d="M9 9h.01M15 9h.01"/>
    </svg>
  ),
  consulting: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  sustainability: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  management: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
    </svg>
  )
};

const ServicesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentServices, setCurrentServices] = useState(SERVICES_DATA);

  const getServiceIcon = (category) => {
    const IconComponent = ServiceIcons[category] || ServiceIcons.design;
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

      {/* Services Grid - Hotel Style Cards */}
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
              key="all-services"
              className="services-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="services-grid-hotel">
                {currentServices.map((service, index) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    index={index}
                    getServiceIcon={getServiceIcon}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <AdvancedFooter />
    </motion.div>
  );
};

// Component for Hotel Style Cards
const ServiceCard = ({ service, index, getServiceIcon }) => {
  return (
    <motion.div
      className="service-card-hotel"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/services/${service.slug}`} className="service-card-link">
        <div className="service-image-container">
          <img src={service.image} alt={service.title} className="service-image" />
          
          {/* Overlay with service title and button - Always Visible */}
          <div className="service-overlay-hotel">
            <div className="service-content-hotel">
              <div className="service-title-wrapper">
                <h3 className="service-title-hotel">{service.title}</h3>
                <div className="service-icon-hotel">
                  {getServiceIcon(service.category)}
                </div>
              </div>
              
              {/* Learn More Button - Always Visible */}
              <motion.div 
                className="learn-more-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LEARN MORE
                <span className="btn-arrow">→</span>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServicesPage;