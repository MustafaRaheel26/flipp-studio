// src/components/EnhancedPreloader.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './EnhancedPreloader.css';

const EnhancedPreloader = () => {
  const [loading, setLoading] = useState(true);
  const preloaderRef = useRef(null);
  const fLetterRef = useRef(null);

  useEffect(() => {
    // Add class to body to hide navbar and other content
    document.body.classList.add('preloader-active');
    
    // Ensure body is locked
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        // Keep visible for a moment before fading out
        gsap.delayedCall(1.0, () => {
          // Smooth fade out
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
              setLoading(false);
              document.body.classList.remove('preloader-active');
              document.body.style.overflow = 'auto';
              document.body.style.height = 'auto';
            }
          });
        });
      }
    });

    // F Letter Flip Animation - Special treatment for the first letter
    tl.to(fLetterRef.current, {
      rotationY: 180,
      duration: 1.2,
      ease: "power2.inOut"
    }, 0.8)

    // FLIP Animation - Slower and more deliberate (excluding F which is already animated)
    .to('.flip .text-stroke', {
      x: 0,
      duration: 2.0,
      ease: "power2.out"
    }, 1.5)

    .to('.flip .text-mask:not(.f-mask)', {
      x: 0,
      duration: 1.5,
      ease: "power2.out"
    }, 2.2)

    .to('.flip .text-final:not(.f-final)', {
      opacity: 1,
      duration: 1.0,
      ease: "power2.out"
    }, 3.0);

    // STUDIO Animation - Even slower and starts later
    tl.to('.studio .text-stroke', {
      x: 0,
      duration: 1.8,
      ease: "power2.out"
    }, 2.5)

    .to('.studio .text-mask', {
      x: 0,
      duration: 1.3,
      ease: "power2.out"
    }, 3.5)

    .to('.studio .text-final', {
      opacity: 1,
      duration: 0.9,
      ease: "power2.out"
    }, 4.2);

    // Total animation time: ~5.2 seconds + 1 second delay before fade out = 6.2 seconds

    return () => {
      document.body.classList.remove('preloader-active');
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="enhanced-preloader" ref={preloaderRef}>
      <div className="preloader-content">
        <div className="logo-wrapper">
          <div className="flip">
            {/* Special F letter with flip animation */}
            <div className="letter-container">
              <div className="f-letter" ref={fLetterRef}>
                <div className="text-stroke f-stroke">F</div>
                <div className="text-mask f-mask">F</div>
                <div className="text-final f-final">F</div>
              </div>
            </div>
            
            {/* Regular L, I, P letters */}
            <div className="letter-container">
              <div className="text-stroke">L</div>
              <div className="text-mask">L</div>
              <div className="text-final">L</div>
            </div>
            
            <div className="letter-container">
              <div className="text-stroke">I</div>
              <div className="text-mask">I</div>
              <div className="text-final">I</div>
            </div>
            
            <div className="letter-container">
              <div className="text-stroke">P</div>
              <div className="text-mask">P</div>
              <div className="text-final">P</div>
            </div>
          </div>
          
          <div className="studio">
            <div className="text-stroke">STUDIO</div>
            <div className="text-mask">STUDIO</div>
            <div className="text-final">STUDIO</div>
          </div>
        </div>
        
        {/* No loading text - just the logo */}
      </div>
    </div>
  );
};

export default EnhancedPreloader;