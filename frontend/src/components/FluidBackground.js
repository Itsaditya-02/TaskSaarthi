import React, { useEffect, useRef } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;
    let mouse = { x: 0, y: 0, px: 0, py: 0, moved: false };
    const blobs = [];
    const colors = ['#6366f1', '#a855f7', '#22c55e', '#ec4899'];

    const createBlob = (x, y) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x, y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 300 + 200,
        color,
        opacity: 0.6
      };
    };

    // Initialize some background blobs
    for(let i=0; i<5; i++) {
      blobs.push(createBlob(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
    }

    const handleMouseMove = (e) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      const { innerWidth: width, innerHeight: height } = window;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);
      ctx.filter = 'blur(80px)';

      blobs.forEach((blob) => {
        if (mouse.moved) {
          const dx = mouse.x - blob.x;
          const dy = mouse.y - blob.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 500) {
            blob.vx += dx * 0.0001;
            blob.vy += dy * 0.0001;
          }
        }

        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < -100 || blob.x > width + 100) blob.vx *= -1;
        if (blob.y < -100 || blob.y > height + 100) blob.vy *= -1;

        ctx.globalAlpha = blob.opacity;
        ctx.fillStyle = blob.color;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 0.4;
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6, mixBlendMode: 'screen' }}
    />
  );
};

export default FluidBackground;
