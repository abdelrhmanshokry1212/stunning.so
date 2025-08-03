"use client";

import { useRef, useEffect, useState, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines";
  from?: any;
  to?: any;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  onLetterAnimationComplete?: () => void;
}

const SplitText = forwardRef<HTMLParagraphElement, SplitTextProps>(({
  text,
  className = "",
  delay = 50,
  duration = 0.4,
  ease = "power2.out",
  splitType = "chars",
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-50px",
  textAlign = "center",
  onLetterAnimationComplete,
}, ref) => {
  const internalRef = useRef<HTMLParagraphElement>(null);
  const animationCompletedRef = useRef(false);
  const scrollTriggerRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Use the forwarded ref or fall back to internal ref
  const elementRef = (ref as React.RefObject<HTMLParagraphElement>) || internalRef;

  // Fix hydration by ensuring we're on client side
  useEffect(() => {
    setIsClient(true);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isClient || !isMounted || !elementRef || !text) return;

    const el = elementRef.current;
    if (!el) return;
    
    animationCompletedRef.current = false;

    // Clear any existing content
    el.innerHTML = '';

    // Create character spans with proper GSAP setup
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.whiteSpace = 'pre';
      return span;
    });

    // Add spans to DOM
    chars.forEach(span => el.appendChild(span));

    // Set initial state
    gsap.set(chars, { ...from });

    // Create timeline with faster, more responsive animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${(1 - threshold) * 100}%${rootMargin}`,
        toggleActions: "play none none reverse",
        once: true,
        onToggle: (self: any) => {
          scrollTriggerRef.current = self;
        },
      },
      onComplete: () => {
        animationCompletedRef.current = true;
        onLetterAnimationComplete?.();
      },
    });

    // Animate with faster stagger and duration
    tl.to(chars, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      overwrite: "auto",
    });

    return () => {
      tl.kill();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      gsap.killTweensOf(chars);
    };
  }, [
    isClient,
    isMounted,
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
    elementRef,
  ]);

  // Always render the same structure to prevent hydration mismatch
  return (
    <p
      ref={elementRef}
      className={`split-parent ${className}`}
      style={{
        textAlign: textAlign as any,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
        opacity: isClient ? 1 : 0, // Hide during SSR, show on client
      }}
    >
      {text}
    </p>
  );
});

SplitText.displayName = 'SplitText';

export default SplitText; 