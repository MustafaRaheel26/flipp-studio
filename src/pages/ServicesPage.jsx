// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AdvancedFooter from "../components/AdvancedFooter";
import { SERVICES_DATA } from "../data/servicesData";
import "./ServicesPage.css";

const ServicesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentServices, setCurrentServices] = useState(SERVICES_DATA);

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
const ServiceCard = ({ service, index }) => {
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
              </div>
              
              {/* Learn More Button - Always Visible */}
              <motion.div 
                className="learn-more-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW DETAILS
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