"use client";

import React, { useEffect } from 'react';

export default function ProtectedViewer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable copy/cut globally
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts (Ctrl+C, Ctrl+P, Ctrl+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c' || e.key === 'p' || e.key === 's') {
          e.preventDefault();
          return false;
        }
      }
      // PrintScreen key deterrent (blurs the screen if they hit PRTSCR)
      if (e.key === 'PrintScreen') {
        document.body.style.filter = 'blur(10px)';
        setTimeout(() => {
          document.body.style.filter = 'none';
        }, 3000);
        alert("Screenshots are disabled for this content.");
      }
    };

    // Deterrent: Blur when window loses focus
    const handleBlur = () => {
      document.body.style.filter = 'blur(15px)';
    };

    const handleFocus = () => {
      document.body.style.filter = 'none';
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    // Inject strict global CSS to prevent selection everywhere
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.body.style.filter = 'none';
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div 
      className="select-none pointer-events-auto" 
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
