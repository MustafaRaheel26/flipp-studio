import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import AdvancedFooter from "../components/AdvancedFooter";
import {
  PROJECTS_DATA,
  getProjectsByCategory,
  CATEGORIES,
} from "../data/projectsData";
import "./ProjectsPage.css";

// Layout configuration - easily customizable
const LAYOUT_CONFIG = {
  patterns: [
    ['portrait', 'landscape', 'square', 'portrait'],
    ['landscape', 'square', 'portrait', 'landscape'],
    ['square', 'portrait', 'landscape', 'square'],
    ['portrait', 'square', 'landscape', 'portrait']
  ],
  gridColumns: {
    desktop: 4,
    tablet: 3,
    mobile: 2,
    smallMobile: 1
  },
  cardHeights: {
    portrait: { desktop: 600, tablet: 450, mobile: 300 },
    landscape: { desktop: 300, tablet: 250, mobile: 200 },
    square: { desktop: 300, tablet: 250, mobile: 200 }
  }
};

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [expandedProjects, setExpandedProjects] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sliderRef = useRef(null);
  const location = useLocation();

  // Track window width for responsive layout
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive grid columns based on screen size
  const getGridColumns = () => {
    if (windowWidth < 480) return LAYOUT_CONFIG.gridColumns.smallMobile;
    if (windowWidth < 768) return LAYOUT_CONFIG.gridColumns.mobile;
    if (windowWidth < 1024) return LAYOUT_CONFIG.gridColumns.tablet;
    return LAYOUT_CONFIG.gridColumns.desktop;
  };

  // Smart layout distribution that fills all spaces
  const expandProjects = (projects) => {
    if (projects.length === 0) return [];
    
    const gridColumns = getGridColumns();
    const totalCards = Math.max(projects.length * 2, 12); // Ensure enough cards
    const expanded = [];
    
    // Use pattern based on grid columns
    const pattern = LAYOUT_CONFIG.patterns[gridColumns % LAYOUT_CONFIG.patterns.length];
    
    for (let i = 0; i < totalCards; i++) {
      const project = projects[i % projects.length];
      const layout = pattern[i % pattern.length];
      
      expanded.push({
        ...project,
        layout: layout,
        uniqueId: `${project.id}-${i}-${layout}`,
        index: i
      });
    }
    
    return expanded;
  };

  // Get all projects for "ALL" category
  const getAllProjects = () => {
    return PROJECTS_DATA;
  };

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && (hash === 'all' || CATEGORIES.some(cat => cat.id === hash))) {
      setActiveCategory(hash);
    }
    
    let projects;
    if (activeCategory === 'all') {
      projects = getAllProjects();
    } else {
      projects = getProjectsByCategory(activeCategory);
    }
    
    setCurrentProjects(projects);
    setExpandedProjects(expandProjects(projects));
  }, [location, activeCategory, windowWidth]); // Added windowWidth dependency

  const handleCategoryChange = (categoryId) => {
    setIsLoading(true);
    setActiveCategory(categoryId);

    setTimeout(() => {
      let projects;
      if (categoryId === 'all') {
        projects = getAllProjects();
      } else {
        projects = getProjectsByCategory(categoryId);
      }
      
      setCurrentProjects(projects);
      setExpandedProjects(expandProjects(projects));
      setIsLoading(false);
      
      window.history.replaceState(null, '', `#${categoryId}`);
    }, 400);
  };

  // Add ALL category to the categories list
  const ALL_CATEGORIES = [
    { id: 'all', name: 'ALL' },
    ...CATEGORIES
  ];

  return (
    <motion.div
      className="projects-main-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Fixed Category Links Below Navbar */}
      <section className="categories-section">
        <div className="categories-container" ref={sliderRef}>
          {ALL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              className={`category-link ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <span className="link-text">
                {category.name}
              </span>
              <div className="link-underline"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Gallery with Mixed Layout */}
      <section className="projects-grid-section">
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
              className="projects-grid-mixed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                '--grid-columns': getGridColumns()
              }}
            >
              {expandedProjects.map((project, index) => (
                <ProjectCard 
                  key={project.uniqueId} 
                  project={project} 
                  index={index}
                  layout={project.layout}
                  windowWidth={windowWidth}
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

const ProjectCard = ({ project, index, layout, windowWidth }) => {
  const getCardHeight = () => {
    if (windowWidth < 480) return 250;
    if (windowWidth < 768) return LAYOUT_CONFIG.cardHeights[layout].mobile;
    if (windowWidth < 1024) return LAYOUT_CONFIG.cardHeights[layout].tablet;
    return LAYOUT_CONFIG.cardHeights[layout].desktop;
  };

  return (
    <motion.div
      className={`project-card project-card-${layout}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100
      }}
      style={{
        '--card-height': `${getCardHeight()}px`
      }}
    >
      <Link to={`/projects/${project.slug}`} className="project-card-link">
        <div className="project-image-container">
          <img 
            src={project.image} 
            alt={project.title} 
            className="project-image"
            loading="lazy"
          />
          
          {/* Always visible project name */}
          <div className="project-name-static">
            <h3 className="project-title">{project.title}</h3>
          </div>
          
          {/* Hover overlay with additional info */}
          <div className="project-overlay">
            <div className="project-info">
              <div className="project-meta">
                <span className="project-year">{project.year}</span>
                <span className="project-location">{project.location}</span>
                <span className="project-category">{project.category.toUpperCase()}</span>
              </div>
              <p className="project-description">{project.description}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectsPage;