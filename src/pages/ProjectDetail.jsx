import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import AdvancedFooter from '../components/AdvancedFooter';
import { getProjectBySlug } from '../data/projectsData';
import './ProjectDetail.css';

// Individual Image Component with separate Intersection Observer
const GalleryImage = ({ image, alt, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          setIsVisible(true);
        } 
        else if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          setIsVisible(false);
        }
      },
      {
        threshold: [0, 0.2, 0.6, 1],
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={imageRef}
      className={`gallery-image ${className} ${isVisible ? 'animated' : ''}`}
      style={{ transitionDelay: isVisible ? `${delay}s` : '0s' }}
    >
      <img 
        src={image} 
        alt={alt}
        loading="lazy"
      />
    </div>
  );
};

// Full Width Image Gallery - UPDATED: Now displays all images one by one
const FullWidthGallery = ({ images, projectTitle, startIndex = 0, endIndex = null }) => {
  const galleryImages = endIndex 
    ? images.slice(startIndex, endIndex)
    : images.slice(startIndex);

  return (
    <section className="fullwidth-gallery">
      <div className="fullwidth-gallery-container">
        {galleryImages.map((image, index) => (
          <GalleryImage 
            key={startIndex + index}
            image={image} 
            alt={`${projectTitle} - Detail ${startIndex + index + 1}`}
            className="fullwidth-image"
            delay={index * 0.2}
          />
        ))}
      </div>
    </section>
  );
};

// Single Hero Image
const HeroImage = ({ image, alt, delay = 0 }) => {
  return (
    <section className="hero-image-section">
      <GalleryImage 
        image={image} 
        alt={alt}
        className="hero-image"
        delay={delay}
      />
    </section>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar opacity
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.add('project-detail-page');
    if (scrolled) {
      document.body.classList.add('project-nav-scrolled');
    } else {
      document.body.classList.remove('project-nav-scrolled');
    }

    const foundProject = getProjectBySlug(slug);
    
    if (!foundProject) {
      setLoading(false);
      return;
    }

    setProject(foundProject);

    // Auto-rotate images
    const interval = setInterval(() => {
      if (foundProject?.images) {
        setCurrentImageIndex(prev => 
          prev === foundProject.images.length - 1 ? 0 : prev + 1
        );
      }
    }, 4000);

    setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => {
      clearInterval(interval);
      document.body.classList.remove('project-detail-page', 'project-nav-scrolled');
    };
  }, [slug, scrolled]);

  if (loading) {
    return (
      <div className="project-detail">
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail">
        <div style={{ padding: '100px 20px', textAlign: 'center', color: '#fff' }}>
          <h1>Project Not Found</h1>
          <Link to="/projects" style={{ color: '#fff', textDecoration: 'none' }}>
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      className="project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="project-hero">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="project-hero-bg"
            style={{ backgroundImage: `url(${project.images[currentImageIndex]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        
        <div className="project-hero-content">
          <motion.div
            className="hero-text"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h1>{project.title}</h1>
            <p className="hero-subtitle">{project.description}</p>
          </motion.div>

          <motion.div 
            className="project-meta-hero"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="meta-grid">
              <div className="meta-item">
                <span className="meta-label">YEAR</span>
                <span className="meta-value">{project.year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">LOCATION</span>
                <span className="meta-value">{project.location}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">CATEGORY</span>
                <span className="meta-value">{project.category.toUpperCase()}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">AREA</span>
                <span className="meta-value">{project.area}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Content - All images in full width one by one */}
      <section className="project-content-visual">
        
        {/* First set of images */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FullWidthGallery 
            images={project.images} 
            projectTitle={project.title} 
            startIndex={0}
            endIndex={Math.ceil(project.images.length / 3)}
          />
        </motion.div>

        {/* Second set of images */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FullWidthGallery 
            images={project.images} 
            projectTitle={project.title} 
            startIndex={Math.ceil(project.images.length / 3)}
            endIndex={Math.ceil(project.images.length * 2 / 3)}
          />
        </motion.div>

        {/* Third set of images */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <FullWidthGallery 
            images={project.images} 
            projectTitle={project.title} 
            startIndex={Math.ceil(project.images.length * 2 / 3)}
          />
        </motion.div>

        {/* Single Back to Projects Button at Bottom */}
        <motion.div 
          className="project-navigation"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Link to="/projects" className="back-to-projects-btn">
            <span className="btn-arrow">←</span>
            BACK TO PROJECTS
          </Link>
        </motion.div>
      </section>

      <AdvancedFooter />
    </motion.div>
  );
};

export default ProjectDetail;