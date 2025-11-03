import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./FeaturedProjects.css";

// Simplified video import
import projectVideo from "../assets/vid.mp4";

export default function FeaturedProjects() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Film animation - uncover from left to right
  const filmTranslateX = useTransform(
    scrollYProgress,
    [0, 0.5], // Only animate when entering, stay uncovered
    ["0%", "-100%"]
  );

  // Film shadow opacity
  const filmShadowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [1, 0.5, 0]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log("Video element found, source:", projectVideo);
      
      const handleLoadedData = () => {
        console.log("Video loaded successfully");
        setIsVideoLoaded(true);
        video.play().catch(error => {
          console.log("Autoplay prevented:", error);
        });
      };

      const handleError = (e) => {
        console.error("Video loading error:", e);
        console.error("Video source attempted:", projectVideo);
        setVideoError(true);
      };

      const handleCanPlay = () => {
        console.log("Video can play through");
        setIsVideoLoaded(true);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('canplaythrough', handleCanPlay);
      video.addEventListener('error', handleError);

      // Try to load the video
      video.load();

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplaythrough', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  const handleRetryLoad = () => {
    setVideoError(false);
    setIsVideoLoaded(false);
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  };

  return (
    <section className="featured-projects-section" ref={containerRef}>
      <div className="video-section">
        {/* Video Container */}
        <div className="video-container">
          <video
            ref={videoRef}
            className="project-video"
            muted
            loop
            playsInline
            preload="auto"
            webkit-playsinline="true"
            crossOrigin="anonymous"
          >
            <source src={projectVideo} type="video/mp4" />
            <source src={projectVideo} type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
          
          {/* Loading/Error states */}
          {!isVideoLoaded && !videoError && (
            <div className="video-loading">
              <div className="loading-spinner"></div>
              <p>Loading Project Video...</p>
            </div>
          )}

          {videoError && (
            <div className="video-error">
              <p>Failed to load video</p>
              <button className="retry-button" onClick={handleRetryLoad}>
                Retry Loading Video
              </button>
              <p className="error-help">
                Check if the video file exists at: assets/vid.mp4
              </p>
              <p className="error-help">
                Current path: {projectVideo}
              </p>
            </div>
          )}
        </div>

        {/* Horizontal Film Overlay with Shadow */}
        <motion.div 
          className="film-overlay"
          style={{ 
            x: filmTranslateX,
          }}
        >
          <motion.div 
            className="film-shadow"
            style={{
              opacity: filmShadowOpacity
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}