// src/components/Cursor.jsx
import React, { useEffect, useRef } from "react";
import "./Cursor.css";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("fs-cursor");
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId = null;

    // Smooth movement function
    const smoothMove = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }
      rafId = requestAnimationFrame(smoothMove);
    };

    function onMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onEnter(e) {
      const el = e.currentTarget;
      
      // For ALL links - add link hover class
      if (el.tagName === 'A' || el.classList.contains('nav-link') || el.classList.contains('brand') || el.classList.contains('mobile-link')) {
        cursor.classList.add("fs-cursor--link-hover");
      }
      // For buttons
      else if (el.tagName === 'BUTTON' || el.classList.contains('btn') || el.classList.contains('button') || el.classList.contains('hamburger')) {
        cursor.classList.add("fs-cursor--link-hover"); // Use same class for buttons now
      }
    }

    function onLeave(e) {
      cursor.classList.remove("fs-cursor--link-hover", "fs-cursor--button");
    }

    function onMouseDown() {
      cursor.classList.add("fs-cursor--click");
    }

    function onMouseUp() {
      cursor.classList.remove("fs-cursor--click");
    }

    // Attach event listeners
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Get ALL interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .nav-link, .brand, .mobile-link, .hamburger, .btn, .button, .project-card, .card, [data-cursor-hover]"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Start smooth animation
    smoothMove();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      
      if (rafId) cancelAnimationFrame(rafId);
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
    };
  }, []);

  return null;
}