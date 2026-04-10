import React, { useEffect, useState } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [outlinePos, setOutlinePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
      
      // Request animation frame for smooth outline trailing
      requestAnimationFrame(() => {
        setOutlinePos({ x: e.clientX, y: e.clientY });
      });
    };

    const onMouseDown = () => setIsPointer(true);
    const onMouseUp = () => setIsPointer(false);

    const onMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') ||
        target.tagName === 'INPUT' ||
        target.role === 'button' ||
        target.classList.contains('interactive')
      ) {
        setIsPointer(true);
      }
    };

    const onMouseLeave = () => setIsPointer(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    // Add listeners to all interactive elements
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  return (
    <div className={`cursor-wrapper ${isPointer ? 'custom-cursor-active' : ''} ${isHidden ? 'custom-cursor-hide' : ''}`}>
      <div 
        className="custom-cursor" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className="custom-cursor-outline" 
        style={{ left: `${outlinePos.x}px`, top: `${outlinePos.y}px` }}
      />
    </div>
  );
};

export default Cursor;

export const useMagnetic = () => {
  useEffect(() => {
    const items = document.querySelectorAll('.magnetic-item');
    
    items.forEach((item) => {
      const onMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = item.getBoundingClientRect();
        
        const center = {
          x: left + width / 2,
          y: top + height / 2,
        };
        
        const distance = {
          x: clientX - center.x,
          y: clientY - center.y,
        };
        
        // Intensity of magnetic pull
        const strength = 15; 
        
        item.style.transform = `translate(${distance.x / strength}px, ${distance.y / strength}px)`;
      };
      
      const onMouseLeave = () => {
        item.style.transform = `translate(0, 0)`;
      };
      
      item.addEventListener('mousemove', onMouseMove);
      item.addEventListener('mouseleave', onMouseLeave);
      
      return () => {
        item.removeEventListener('mousemove', onMouseMove);
        item.removeEventListener('mouseleave', onMouseLeave);
      };
    });
  }, []);
};
