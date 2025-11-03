// src/pages/Home.jsx
import React from "react";
import Hero from "../sections/Hero";
import BrandCarousel from "../sections/BrandCarousel";
import FeatureProjects from "../sections/FeaturedProjects";
import ServicesSlider from "../sections/ServicesSlider";
import AdvancedFooter from "../components/AdvancedFooter";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-root">
      <Hero />
      <BrandCarousel />
      <ServicesSlider />
      <FeatureProjects />
      <AdvancedFooter />
    </div>
  );
}