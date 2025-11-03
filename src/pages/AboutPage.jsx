import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./AboutPage.css";

// Hook to detect screen size
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // ===== TEAM CONFIGURATION =====
  const team = [
    {
      name: "Ava Martin",
      role: "Principal Architect",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop",
      bio: "Ava leads the studio with over 15 years of experience in architectural innovation, blending minimalism with spatial storytelling. Her vision has shaped award-winning projects across three continents.",
      achievements: "RIBA Award Winner 2023, Featured in Architectural Digest"
    },
    {
      name: "Liam Brooks",
      role: "Design Director",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=800&fit=crop",
      bio: "Liam shapes the creative direction of our projects, emphasizing material honesty and structural balance. His expertise in sustainable design has revolutionized our approach to eco-conscious architecture.",
      achievements: "AIA Design Excellence Award, Published author of 'Material Futures'"
    },
    {
      name: "Noah Patel",
      role: "Project Architect",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=800&fit=crop",
      bio: "Noah ensures every concept transitions flawlessly from paper to structure, maintaining precision and integrity. His technical mastery and attention to detail bring impossible visions to life.",
      achievements: "Emerging Architect of the Year 2024, BIM Excellence Award"
    },
  ];

  // ===== VALUES CONFIGURATION =====
  const values = [
    {
      title: "Innovation",
      description: "We push boundaries, exploring new materials, technologies, and methodologies to create spaces that challenge conventional thinking.",
      icon: "✦"
    },
    {
      title: "Sustainability",
      description: "Every project incorporates sustainable practices, from passive design strategies to renewable materials, minimizing environmental impact.",
      icon: "◈"
    },
    {
      title: "Community",
      description: "Architecture serves people. We design with communities in mind, creating spaces that foster connection, culture, and collective growth.",
      icon: "◆"
    },
    {
      title: "Craftsmanship",
      description: "Details matter. Our commitment to precision and quality ensures that every element is thoughtfully crafted and beautifully executed.",
      icon: "◇"
    }
  ];

  // ===== STATISTICS CONFIGURATION =====
  const statistics = [
    {
      number: "150+",
      label: "Projects Completed",
      description: "From residential masterpieces to commercial landmarks across the globe"
    },
    {
      number: "25+",
      label: "International Awards",
      description: "Recognized for design excellence and innovation in architecture"
    },
    {
      number: "12",
      label: "Years of Excellence",
      description: "Over a decade of shaping skylines and creating timeless spaces"
    }
  ];

  return (
    <div ref={containerRef} className="about-page">
      {/* ===== Hero Section ===== */}
      <motion.section
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="about-title">We design beyond structures.</h1>
          <p className="about-subtitle">
            FlipStudio is an architectural collective crafting spaces that
            balance aesthetics, emotion, and purpose. Every project begins as an
            exploration — of space, material, and the way humans interact with
            design.
          </p>
        </motion.div>
      </motion.section>

      {/* ===== Philosophy Card Section ===== */}
      <ParallaxCard
        scrollProgress={scrollYProgress}
        start={0.05}
        end={0.25}
        index={0}
        isMobile={isMobile}
      >
        <CardContent
          heading="Our Philosophy"
          content={
            <>
              <p className="card-text">
                Architecture, to us, is the translation of imagination into
                geometry. It's the art of finding harmony between vision and
                gravity — between the intangible and the built.
              </p>
              <p className="card-text">
                We approach every project as a dialogue between nature, culture,
                and innovation. Our spaces are meant to evolve, to breathe, and to
                adapt with those who inhabit them.
              </p>
              <p className="card-text">
                We believe that architecture has the power to shape experiences, influence emotions, and create lasting memories. Each structure we design tells a story — one that unfolds through light, shadow, texture, and form.
              </p>
            </>
          }
        />
      </ParallaxCard>

      {/* ===== Statistics Card Section ===== */}
      <ParallaxCard
        scrollProgress={scrollYProgress}
        start={0.2}
        end={0.4}
        index={1}
        isMobile={isMobile}
      >
        <CardContent
          heading="Our Impact"
          content={
            <div className="statistics-grid">
              {statistics.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="stat-number"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    {stat.number}
                  </motion.div>
                  <h3 className="stat-label">{stat.label}</h3>
                  <p className="stat-desc">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          }
        />
      </ParallaxCard>

      {/* ===== Values Card Section ===== */}
      <ParallaxCard
        scrollProgress={scrollYProgress}
        start={0.35}
        end={0.55}
        index={2}
        isMobile={isMobile}
      >
        <CardContent
          heading="Our Values"
          content={
            <div className="values-grid">
              {values.map((value, idx) => (
                <motion.div
                  key={value.title}
                  className="value-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="value-icon">{value.icon}</div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-desc">{value.description}</p>
                </motion.div>
              ))}
            </div>
          }
        />
      </ParallaxCard>

      {/* ===== Process Card Section ===== */}
      <ParallaxCard
        scrollProgress={scrollYProgress}
        start={0.5}
        end={0.75}
        index={3}
        isMobile={isMobile}
      >
        <CardContent
          heading="Our Process"
          content={
            <ul className="process-list">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  desc: "We begin by understanding the site, the story, and the people. Every design begins with empathy and research. Through workshops, site analysis, and collaborative sessions, we uncover the unique DNA of each project.",
                },
                {
                  step: "02",
                  title: "Design",
                  desc: "Concepts take form through sketches, digital modeling, and collaboration. We sculpt ideas into tangible visions, iterating through multiple design phases to refine and perfect every detail.",
                },
                {
                  step: "03",
                  title: "Build",
                  desc: "Precision and detail define our execution. We work closely with partners to ensure every element aligns with the vision. From foundation to finish, we maintain rigorous quality control and creative oversight.",
                },
              ].map((item) => (
                <motion.li
                  key={item.step}
                  className="process-item"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="step">{item.step}</span>
                  <div>
                    <h3 className="process-title">{item.title}</h3>
                    <p className="process-desc">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          }
        />
      </ParallaxCard>

      {/* ===== Team Card Section ===== */}
      <ParallaxCard
        scrollProgress={scrollYProgress}
        start={0.65}
        end={0.95}
        index={4}
        isMobile={isMobile}
      >
        <CardContent
          heading="Our Team"
          content={
            <div className="team-grid">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="team-member"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="team-img-wrap">
                    <img src={member.img} alt={member.name} className="team-img" />
                  </div>
                  <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <h4 className="team-role">{member.role}</h4>
                    <p className="team-bio">{member.bio}</p>
                    <p className="team-achievements">{member.achievements}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          }
        />
      </ParallaxCard>

      {/* ===== Final Section ===== */}
      <motion.section
        className="final-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="final-heading">
          We don't just build spaces — we build identities, legacies, and futures.
        </h2>
      </motion.section>
    </div>
  );
}

function ParallaxCard({ children, scrollProgress, start, end, index, isMobile }) {
  const scale = useTransform(scrollProgress, [start, end], [0.8, 1]);
  const opacity = useTransform(scrollProgress, [start, start + 0.05, end + 0.15, end + 0.25], [0, 1, 1, 0.3]);
  
  return (
    <motion.div
      className="parallax-card"
      style={{
        scale: isMobile ? 1 : scale,
        opacity,
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? 'auto' : `${120 + index * 20}px`,
      }}
    >
      {children}
    </motion.div>
  );
}

function CardContent({ heading, content }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`card ${isHovered ? 'card-hovered' : ''}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="section-heading">{heading}</h2>
      <div className="card-content-wrap">{content}</div>
    </motion.div>
  );
}