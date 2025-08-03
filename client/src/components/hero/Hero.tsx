"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from '@/components/text';
import './Hero.css';

export default function Hero() {
  const mainSloganRef = useRef<HTMLParagraphElement>(null);
  const subSloganRef = useRef<HTMLParagraphElement>(null);

  const handleMainSloganComplete = () => {
    console.log('Main slogan animation complete!');
    
    // Start sub-slogan animation with a more direct approach
    if (subSloganRef.current) {
      const subSlogan = subSloganRef.current;
      
      // Set initial state
      gsap.set(subSlogan, { 
        opacity: 0, 
        scale: 0.8,
        y: 20
      });
      
      // Animate with a punchy, direct effect
      gsap.to(subSlogan, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.7)",
        onComplete: () => {
          console.log('Sub slogan animation complete!');
        }
      });
    }
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <SplitText
          ref={mainSloganRef}
          text="Think It. Prompt It. Launch It."
          className="main-slogan"
          delay={40}
          duration={0.3}
          ease="power2.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-30px"
          textAlign="center"
          onLetterAnimationComplete={handleMainSloganComplete}
        />
        
        <p
          ref={subSloganRef}
          className="sub-slogan"
          style={{
            textAlign: "center",
            opacity: 0,
            transform: "scale(0.8) translateY(20px)",
          }}
        >
          AI-powered websites built in seconds — no code, no limits.
        </p>
      </div>
    </div>
  );
} 