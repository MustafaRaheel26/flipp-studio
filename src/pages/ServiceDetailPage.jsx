// src/pages/ServiceDetailPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdvancedFooter from "../components/AdvancedFooter";
import { SERVICES_DATA, SERVICE_CATEGORIES } from "../data/servicesData";
import "./ServiceDetailPage.css";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundService = SERVICES_DATA.find(s => s.slug === slug);
    if (foundService) {
      setService(foundService);
    } else {
      navigate('/services');
    }
    setIsLoading(false);
  }, [slug, navigate]);

  // Auto-slide functionality
  useEffect(() => {
    if (!service || service.images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % service.images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [service]);

  const getRelatedServices = () => {
    if (!service) return [];
    return SERVICES_DATA
      .filter(s => s.category === service.category && s.id !== service.id)
      .slice(0, 3);
  };

  if (isLoading) {
    return (
      <div className="service-detail-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  const relatedServices = getRelatedServices();

  return (
    <motion.div
      className="service-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navigation Header */}
      <section className="service-detail-header">
        <div className="container">
          <motion.div
            className="breadcrumb-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/services" className="back-btn">
              ← BACK TO SERVICES
            </Link>
            <div className="breadcrumb">
              <Link to="/">HOME</Link>
              <span>/</span>
              <Link to="/services">SERVICES</Link>
              <span>/</span>
              <span className="current">{service.title}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-grid">
            <motion.div
              className="service-hero-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="service-category-tag">
                {SERVICE_CATEGORIES.find(cat => cat.id === service.category)?.name || service.category}
              </div>
              <h1 className="service-hero-title">{service.title}</h1>
              <p className="service-hero-description">{service.fullDescription}</p>
              
              <div className="service-hero-meta">
                <div className="meta-item">
                  <span className="meta-label">DURATION</span>
                  <span className="meta-value">{service.duration}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">INVESTMENT</span>
                  <span className="meta-value">{service.priceRange}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">TEAM</span>
                  <span className="meta-value">{service.team.length} specialists</span>
                </div>
              </div>

              <motion.button 
                className="button-86 cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                START YOUR PROJECT
              </motion.button>
            </motion.div>

            <motion.div
              className="service-hero-visual"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="main-image-container">
                <img 
                  src={service.images[activeImage]} 
                  alt={service.title}
                  className="main-service-image"
                />
              </div>
              
              {/* Auto-slide indicators */}
              <div className="slide-indicators">
                {service.images.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="service-process">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>OUR PROCESS</h2>
            <p>Step-by-step approach to delivering exceptional results</p>
          </motion.div>

          <div className="process-steps">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                className="process-step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="step-number">0{index + 1}</div>
                <h3 className="step-title">{step}</h3>
                <div className="step-line"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="service-benefits">
        <div className="container">
          <div className="benefits-grid">
            <motion.div
              className="benefits-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>KEY BENEFITS</h2>
              <p>What you'll achieve with our {service.title.toLowerCase()} service</p>
              
              <ul className="benefits-list">
                {service.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="benefit-check">✓</span>
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="benefits-visual"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img src={service.images[1]} alt="Benefits visualization" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team & Deliverables */}
      <section className="service-details">
        <div className="container">
          <div className="details-grid">
            <motion.div
              className="detail-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3>OUR TEAM</h3>
              <ul className="team-list">
                {service.team.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="detail-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3>DELIVERABLES</h3>
              <ul className="deliverables-list">
                {service.deliverables.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="detail-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>TAGS</h3>
              <div className="tags-container">
                {service.tags.map((tag, index) => (
                  <span key={index} className="service-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="related-services">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>RELATED SERVICES</h2>
              <p>Explore other services that might interest you</p>
            </motion.div>

            <div className="related-services-grid">
              {relatedServices.map((relatedService, index) => (
                <motion.div
                  key={relatedService.id}
                  className="related-service-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/services/${relatedService.slug}`}>
                    <img src={relatedService.image} alt={relatedService.title} />
                    <div className="related-service-content">
                      <h4>{relatedService.title}</h4>
                      <p>{relatedService.description}</p>
                      <span className="button-86 view-service">VIEW SERVICE →</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="service-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>READY TO GET STARTED?</h2>
            <p>Let's discuss your project and how we can help bring your vision to life.</p>
            <div className="cta-buttons">
              <motion.button 
                className="button-86 cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                START PROJECT
              </motion.button>
              <motion.button 
                className="button-86 cta-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SCHEDULE CALL
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </motion.div>
  );
};

export default ServiceDetailPage;