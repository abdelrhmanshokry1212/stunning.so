"use client";

import { useState, useEffect } from 'react';
import './HistorySidebar.css';

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

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHistory: (historyItem: HistoryItem) => void;
}

export default function HistorySidebar({ isOpen, onClose, onSelectHistory }: HistorySidebarProps) {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingItems, setDeletingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
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
        throw new Error('Failed to fetch history');
      }

      const data = await response.json();
      setHistoryItems(data);
    } catch (err) {
      console.error('Error fetching history:', err);
      setError(err instanceof Error ? err.message : 'Failed to load history');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      setDeletingItems(prev => new Set(prev).add(id));
      
      const response = await fetch(`/api/sections/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete history item');
      }

      // Remove from local state
      setHistoryItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error deleting history item:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete history item');
    } finally {
      setDeletingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncatePrompt = (prompt: string, maxLength: number = 60) => {
    return prompt.length > maxLength ? prompt.substring(0, maxLength) + '...' : prompt;
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="history-backdrop" onClick={onClose}></div>
      )}
      
      {/* Sidebar */}
      <div className={`history-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="history-header">
          <h3>History</h3>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        <div className="history-content">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading history...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <p>{error}</p>
              <button onClick={fetchHistory} className="retry-btn">
                🔄 Try Again
              </button>
            </div>
          ) : historyItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h4>No History Yet</h4>
              <p>Your prompts will appear here</p>
            </div>
          ) : (
            <div className="history-list">
              {historyItems.map((item) => (
                <div key={item._id} className="history-item">
                  <div 
                    className="history-item-content"
                    onClick={() => onSelectHistory(item)}
                  >
                    <div className="history-item-header">
                      <h4>{truncatePrompt(item.prompt)}</h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHistoryItem(item._id);
                        }}
                        className="delete-history-btn"
                        title="Delete"
                        disabled={deletingItems.has(item._id)}
                      >
                        {deletingItems.has(item._id) ? '⏳' : '🗑️'}
                      </button>
                    </div>
                    <div className="history-item-meta">
                      <span className="date">{formatDate(item.createdAt)}</span>
                      <span className="sections-count">
                        {item.sections.length} sections
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 