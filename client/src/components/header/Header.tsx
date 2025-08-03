"use client";

import './Header.css';

interface HeaderProps {
  onOpenHistory: () => void;
}

export default function Header({ onOpenHistory }: HeaderProps) {
  return (
    <div className="header-container">
      <div className="logo-section">
        <img 
          src="/stunning_so_logo.jpg" 
          alt="Stunning.so Logo" 
          className="logo-image"
        />
        <span className="logo-text">Stunning.so</span>
      </div>
      <button onClick={onOpenHistory} className="menu-btn">
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
} 