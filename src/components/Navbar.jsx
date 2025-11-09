import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cursor from "./Cursor";
import "./Navbar.css";
import Logo from "../assets/logo.png";

// Navigation links - Contact link goes to ContactInfoPage (/branches)
const NAV_LINKS = [
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/branches" }, // Goes to ContactInfoPage
];

// Split text for animated letters
const SplitText = ({ text }) => (
  <>
    {text.split("").map((letter, i) => (
      <span
        key={i}
        className="letter-container"
        style={{ ["--delay"]: `${i * 60}ms` }}
      >
        <span className="letter">{letter}</span>
        <span className="letter-clone" aria-hidden>
          {letter}
        </span>
      </span>
    ))}
  </>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll visibility and background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // ✅ Let's Talk handler navigates to ContactPage
  const handleLetsTalk = () => {
    navigate("/contact");
    closeMenu();
  };

  return (
    <>
      <Cursor />
      <header
        className={`navbar ${scrolled ? "navbar--scrolled" : "navbar--top"} ${
          !visible ? "navbar--hidden" : ""
        }`}
      >
        <div className="navbar-inner">
          {/* Brand Logo - Updated to use image */}
          <Link
            to="/"
            className="brand"
            onClick={closeMenu}
            aria-label="FlipStudio home"
          >
            <div className="logo-container">
              <img 
                src={Logo} 
                alt="Flip Studio" 
                className="logo-image"
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="nav-links-centered">
            <div className="nav-links-left">
              {NAV_LINKS.slice(0, 2).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                  onClick={closeMenu}
                >
                  <SplitText text={link.name} />
                </Link>
              ))}
            </div>

            <div className="logo-spacer"></div>

            <div className="nav-links-right">
              {NAV_LINKS.slice(2, 4).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                  onClick={closeMenu}
                >
                  <SplitText text={link.name} />
                </Link>
              ))}
            </div>
          </nav>

          {/* Let's Talk Button - goes to ContactPage */}
          <button
            className="lets-talk-btn"
            onClick={handleLetsTalk}
            aria-label="Let's Talk"
          >
            <span className="lets-talk-emoji">💬</span>
            <span className="lets-talk-text">Let's Talk</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`hamburger ${menuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "is-active" : ""}`}>
        <div className="mobile-menu-content">
          <button className="mobile-close" onClick={closeMenu}>
            ✕
          </button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="mobile-link"
              onClick={closeMenu}
            >
              <SplitText text={link.name} />
            </Link>
          ))}
          {/* Let's Talk button in mobile menu - goes to ContactPage */}
          <button className="mobile-lets-talk-btn" onClick={handleLetsTalk}>
            <span className="lets-talk-emoji">💬</span>
            <span className="lets-talk-text">Let's Talk</span>
          </button>
        </div>
      </div>
    </>
  );

}
