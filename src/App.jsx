// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import EnhancedPreloader from "./components/EnhancedPreloader";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicesPage";
import ServiceDetailPage from './pages/ServiceDetailPage';
import ContactInfoPage from "./pages/ContactInfoPage"; // Add this import

import "./index.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        {/* Updated route to use slug parameter */}
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        {/* Add ServiceDetailPage route */}
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        {/* Add ContactInfoPage route */}
        <Route path="/branches" element={<ContactInfoPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <EnhancedPreloader />
      <div className="app-content">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}