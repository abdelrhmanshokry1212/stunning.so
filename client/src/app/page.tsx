"use client";

import { useState } from 'react';
import { DarkVeil } from '@/components/background';
import { WebsiteIdeaForm } from '@/components/form';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { HistorySidebar } from '@/components/history';

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

export default function Home() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleOpenHistory = () => {
    setIsHistoryOpen(true);
  };

  const handleCloseHistory = () => {
    setIsHistoryOpen(false);
  };

  const handleSelectHistory = (historyItem: HistoryItem) => {
    setSelectedHistoryItem(historyItem);
    setIsHistoryOpen(false);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    
    console.log('Selected history item:', historyItem);
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative' }}>
      <DarkVeil />
      <Header onOpenHistory={handleOpenHistory} />
      <Hero />
      <WebsiteIdeaForm selectedHistoryItem={selectedHistoryItem} />
      <HistorySidebar 
        isOpen={isHistoryOpen}
        onClose={handleCloseHistory}
        onSelectHistory={handleSelectHistory}
      />
      
      {/* Notification */}
      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <span>✅ History item loaded successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
}
