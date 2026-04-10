import React from 'react';

const ProgressRing = ({ progress, size = 120, stroke = 8 }) => {
  const radius = size / 2 - stroke;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-white/5"
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-indigo-500 transition-all duration-700 ease-out"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black font-outfit text-white leading-none">{Math.round(progress)}%</span>
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Goal</span>
      </div>
    </div>
  );
};

export default ProgressRing;
