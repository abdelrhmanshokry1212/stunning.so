"use client";

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './SectionsPreview.css';

interface StoredSection {
  _id: string;
  prompt: string;
  sections: Array<{
    name: string;
    description: string;
    aiGenerated?: boolean;
    confidence?: number;
    optimization?: string;
  }>;
  metadata?: {
    source: string;
    timestamp: string;
    serviceVersion: string;
    promptProcessed: string;
    sectionsGenerated: number;
    aiAnalysis?: {
      businessType: string;
      targetAudience: string;
      industry: string;
      keywords: string[];
      sentiment: string;
      complexity: string;
      suggestedSections: string[];
    };
    confidence?: number;
    processingTime?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function SectionsPreview() {
  const [sections, setSections] = useState<StoredSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<StoredSection | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    if (sections.length > 0) {
      animateSections();
    }
  }, [sections]);

  const fetchSections = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/sections', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sections');
      }

      const data = await response.json();
      setSections(data);
    } catch (err) {
      console.error('Error fetching sections:', err);
      setError(err instanceof Error ? err.message : 'Failed to load sections');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSection = async (id: string) => {
    try {
      setIsDeleting(id);
      
      const response = await fetch(`/api/sections/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete section');
      }

      // Remove from local state
      setSections(prev => prev.filter(section => section._id !== id));
      if (selectedSection?._id === id) {
        setSelectedSection(null);
      }
    } catch (err) {
      console.error('Error deleting section:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete section');
    } finally {
      setIsDeleting(null);
    }
  };

  const animateSections = () => {
    const sectionItems = document.querySelectorAll('.section-card');
    gsap.set(sectionItems, { opacity: 0, y: 20 });
    gsap.to(sectionItems, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="sections-preview">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading stored sections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sections-preview">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Sections</h3>
          <p>{error}</p>
          <button onClick={fetchSections} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sections-preview">
      <div className="preview-header">
        <h2>Stored Sections</h2>
        <button onClick={fetchSections} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No Sections Yet</h3>
          <p>Generate some sections to see them here!</p>
        </div>
      ) : (
        <div className="sections-grid">
          {sections.map((section) => (
            <div key={section._id} className="section-card">
              <div className="card-header">
                <h4 className="prompt-text">{section.prompt}</h4>
                <div className="card-actions">
                  <button
                    onClick={() => setSelectedSection(selectedSection?._id === section._id ? null : section)}
                    className="view-btn"
                  >
                    {selectedSection?._id === section._id ? '👁️ Hide' : '👁️ View'}
                  </button>
                  <button
                    onClick={() => deleteSection(section._id)}
                    disabled={isDeleting === section._id}
                    className="delete-btn"
                  >
                    {isDeleting === section._id ? '🗑️...' : '🗑️'}
                  </button>
                </div>
              </div>
              
              <div className="card-meta">
                <span className="date">{formatDate(section.createdAt)}</span>
                <span className="sections-count">{section.sections.length} sections</span>
                {section.metadata?.confidence && (
                  <span className="confidence">Confidence: {Math.round(section.metadata.confidence * 100)}%</span>
                )}
              </div>

              {selectedSection?._id === section._id && (
                <div className="section-details">
                  <div className="sections-list">
                    {section.sections.map((sec, index) => (
                      <div key={index} className="section-item">
                        <h5>{sec.name}</h5>
                        <p>{sec.description}</p>
                        {sec.confidence && (
                          <span className="section-confidence">
                            Confidence: {Math.round(sec.confidence * 100)}%
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {section.metadata?.aiAnalysis && (
                    <div className="ai-analysis">
                      <h5>AI Analysis</h5>
                      <div className="analysis-grid">
                        <div className="analysis-item">
                          <strong>Business Type:</strong> {section.metadata.aiAnalysis.businessType}
                        </div>
                        <div className="analysis-item">
                          <strong>Target Audience:</strong> {section.metadata.aiAnalysis.targetAudience}
                        </div>
                        <div className="analysis-item">
                          <strong>Industry:</strong> {section.metadata.aiAnalysis.industry}
                        </div>
                        <div className="analysis-item">
                          <strong>Sentiment:</strong> {section.metadata.aiAnalysis.sentiment}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 