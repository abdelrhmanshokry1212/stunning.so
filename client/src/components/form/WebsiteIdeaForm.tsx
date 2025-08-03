"use client";

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './WebsiteIdeaForm.css';

interface WebsiteSection {
  title: string;
  content: string;
}

interface HistoryItem {
  _id: string;
  prompt: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  metadata?: {
    source: string;
    timestamp: string;
    promptProcessed: string;
    sectionsGenerated: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface WebsiteIdeaFormProps {
  selectedHistoryItem?: HistoryItem | null;
}

export default function WebsiteIdeaForm({ selectedHistoryItem }: WebsiteIdeaFormProps) {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<WebsiteSection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;

    // Wait for component to be fully mounted
    const timer = setTimeout(() => {
      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(button, {
          y: -4,
          scale: 1.05,
          boxShadow: '0 12px 40px rgba(102, 126, 234, 0.6)',
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          y: 0,
          scale: 1,
          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
          duration: 0.3,
          ease: "power2.out"
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Log when sections state changes
  useEffect(() => {
    console.log('🎯 Frontend: Sections state updated:', sections);
    console.log('🎯 Frontend: Sections count:', sections.length);
    sections.forEach((section, index) => {
      console.log(`🎯 Frontend: Section ${index + 1}:`, section);
    });
  }, [sections]);

  // Handle selected history item
  useEffect(() => {
    if (selectedHistoryItem) {
      setIdea(selectedHistoryItem.prompt);
      setSections(selectedHistoryItem.sections);
      setShowResults(true);
      setError(null);
    }
  }, [selectedHistoryItem]);

  // Animate results when they appear
  useEffect(() => {
    if (showResults && resultsRef.current) {
      const results = resultsRef.current;
      const sections = results.querySelectorAll('.section-item');
      
      console.log('🎯 Frontend: Rendering sections:', sections.length);
      sections.forEach((section, index) => {
        const title = section.querySelector('h4')?.textContent;
        const desc = section.querySelector('p')?.textContent;
        console.log(`🎯 Frontend: Section ${index + 1}:`, { title, desc });
      });
      
      // Enhanced animations with more dramatic effects
      gsap.set(sections, { 
        opacity: 0, 
        y: 30, 
        scale: 0.95,
        rotationX: -15
      });
      
      gsap.to(sections, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });
      
      // Add a subtle glow effect
      gsap.to(sections, {
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)',
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    }
  }, [showResults, sections]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setIsLoading(true);
    setError(null);
    setShowResults(false);

    console.log('🎯 Frontend: Submitting prompt:', idea);

    try {
      // Send request to NestJS API
      const response = await fetch('/api/generate-sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({ 
          prompt: idea,
          timestamp: Date.now() // Add timestamp to prevent caching
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate sections');
      }

      const data = await response.json();
      console.log('🎯 Frontend: Received API response:', data);
      console.log('🎯 Frontend: Sections count:', data.sections?.length);
      
      setSections(data.sections);
      setShowResults(true);
      setIdea('');
    } catch (err) {
      console.error('🎯 Frontend: Error occurred:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSections([]);
    setShowResults(false);
    setError(null);
  };

  return (
    <div className="form-container">
      {!showResults ? (
        <form onSubmit={handleSubmit} className="idea-form">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Write to build something fancy and cool..."
            className="idea-input"
            disabled={isLoading}
          />
          <button 
            ref={buttonRef}
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? '🔄 Building...' : '✨ Build'}
          </button>
        </form>
      ) : (
        <div className="results-container">
          <div className="results-header">
            <h3>Generated Sections</h3>
            <button onClick={handleReset} className="reset-btn">
              ✨ Build Another
            </button>
          </div>
          <div ref={resultsRef} className="sections-list">
            {sections.map((section, index) => (
              <div key={index} className="section-item">
                <h4>{section.title}</h4>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
} 