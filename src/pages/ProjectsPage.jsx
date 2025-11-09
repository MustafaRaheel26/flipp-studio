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

const MASONRY_PATTERNS = {
  desktop: [
    { height: 380 },
    { height: 320 },
    { height: 350 },
    { height: 300 },
    { height: 340 },
    { height: 280 },
  ],
  tablet: [
    { height: 320 },
    { height: 280 },
    { height: 300 },
    { height: 260 },
    { height: 290 },
    { height: 240 },
  ],
  mobile: [
    { height: 280 },
    { height: 240 },
    { height: 260 },
    { height: 220 },
    { height: 250 },
    { height: 200 },
  ],
};

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [navHidden, setNavHidden] = useState(false);
  const location = useLocation();
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mirror navbar hidden state so categories-section can adjust its `top`
  useEffect(() => {
    const updateNavHidden = () => {
      const navbar = document.querySelector(".navbar");
      if (!navbar) return;
      setNavHidden(navbar.classList.contains("navbar--hidden"));
    };

    // Update on scroll and once on mount
    window.addEventListener("scroll", updateNavHidden, { passive: true });
    updateNavHidden();
    return () => window.removeEventListener("scroll", updateNavHidden);
  }, []);

  const getGridColumns = () => {
    if (windowWidth < 481) return 1;
    if (windowWidth < 1025) return 2;
    return 2;
  };

  const getMasonryPattern = () => {
    if (windowWidth < 481) return MASONRY_PATTERNS.mobile;
    if (windowWidth < 1025) return MASONRY_PATTERNS.tablet;
    return MASONRY_PATTERNS.desktop;
  };

  const expandProjects = (projects) => {
    if (projects.length === 0) return [];
    const pattern = getMasonryPattern();

    return projects.map((project, index) => {
      const { height } = pattern[index % pattern.length];
      const spanRows = Math.ceil(height / 10); // 10px row height
      return {
        ...project,
        uniqueId: `${project.id}-${index}`,
        height,
        spanRows,
      };
    });
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && (hash === "all" || CATEGORIES.some((cat) => cat.id === hash))) {
      setActiveCategory(hash);
    }

    const projects =
      activeCategory === "all"
        ? PROJECTS_DATA
        : getProjectsByCategory(activeCategory);

    setExpandedProjects(expandProjects(projects));
  }, [location, activeCategory, windowWidth]);

  const handleCategoryChange = (categoryId) => {
    setIsLoading(true);
    setActiveCategory(categoryId);

    setTimeout(() => {
      const projects =
        categoryId === "all"
          ? PROJECTS_DATA
          : getProjectsByCategory(categoryId);
      setExpandedProjects(expandProjects(projects));
      setIsLoading(false);
      window.history.replaceState(null, "", `#${categoryId}`);
    }, 400);
  };

  const ALL_CATEGORIES = [{ id: "all", name: "ALL" }, ...CATEGORIES];

  return (
    <motion.div
      className="projects-main-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Fixed Category Bar (stays at top when scrolling) */}
      <section
        className={`categories-section ${
          navHidden ? "nav-hidden" : "nav-visible"
        }`}
      >
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
              <span className="link-text">{category.name}</span>
              <div className="link-underline"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="projects-grid-section">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className="loading-spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="spinner"></div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              className="projects-grid-masonry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                "--grid-columns": getGridColumns(),
              }}
            >
              {expandedProjects.map((project, index) => (
                <ProjectCard
                  key={project.uniqueId}
                  project={project}
                  index={index}
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

const ProjectCard = ({ project, index }) => (
  <motion.div
    layout
    className="project-card"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: index * 0.05,
      type: "spring",
      stiffness: 100,
    }}
    style={{
      "--span-rows": project.spanRows,
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

        <div className="project-name-static">
          <h3 className="project-title">{project.title}</h3>
        </div>

        <div className="project-overlay">
          <div className="project-info">
            <div className="project-meta">
              <span className="project-year">{project.year}</span>
              <span className="project-location">{project.location}</span>
              <span className="project-category">
                {project.category.toUpperCase()}
              </span>
            </div>
            <p className="project-description">{project.description}</p>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ProjectsPage;
