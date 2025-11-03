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

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [expandedProjects, setExpandedProjects] = useState([]);
  const sliderRef = useRef(null);
  const location = useLocation();

  // Expand projects by repeating and mixing layouts
  const expandProjects = (projects) => {
    if (projects.length === 0) return [];
    
    const expanded = [];
    const totalCards = 12; // Target number of cards
    
    while (expanded.length < totalCards) {
      projects.forEach(project => {
        if (expanded.length < totalCards) {
          expanded.push({
            ...project,
            layout: getLayoutType(expanded.length),
            uniqueId: `${project.id}-${expanded.length}`
          });
        }
      });
    }
    
    return expanded;
  };

  // More controlled layout pattern
  const getLayoutType = (index) => {
    const patterns = [
      'portrait', 'landscape', 'square',
      'landscape', 'portrait', 'square',
      'square', 'portrait', 'landscape',
      'portrait', 'square', 'landscape'
    ];
    return patterns[index % patterns.length];
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
  }, [location, activeCategory]);

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
            >
              {expandedProjects.map((project, index) => (
                <ProjectCard 
                  key={project.uniqueId} 
                  project={project} 
                  index={index}
                  layout={project.layout}
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

const ProjectCard = ({ project, index, layout }) => {
  return (
    <motion.div
      className={`project-card project-card-${layout}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/projects/${project.slug}`} className="project-card-link">
        <div className="project-image-container">
          <img src={project.image} alt={project.title} className="project-image" />
          
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