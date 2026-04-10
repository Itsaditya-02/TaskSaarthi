import React, { useState, useEffect } from 'react';

const Wisdom = () => {
  const [index, setIndex] = useState(0);

  const wisdomData = [
    {
      quote: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
      tip: "Eat the Frog: Handle your most complex task first thing in the morning.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"
    },
    {
      quote: "Don’t count the days, make the days count.",
      author: "Muhammad Ali",
      tip: "Time Blocking: Allocate specific hours for deep work to avoid distractions.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800"
    },
    {
      quote: "Consistency is more important than perfection.",
      author: "Anonymous",
      tip: "2-Minute Rule: If a task takes less than 2 minutes, do it immediately.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
    },
    {
      quote: "Your future is created by what you do today, not tomorrow.",
      author: "Robert Kiyosaki",
      tip: "Pareto Principle: 80% of results come from 20% of your activities. Find that 20%.",
      image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=800"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wisdomData.length);
    }, 10000); // Change wisdom every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const current = wisdomData[index];

  return (
    <div className="relative group rounded-3xl overflow-hidden glass border border-white/5 h-full min-h-[300px] flex flex-col shadow-2xl animate-fade-in">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={current.image} 
          alt="Wisdom Background" 
          className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-110 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col justify-end h-full mt-auto">
        <div className="mb-6">
          <svg className="w-10 h-10 text-indigo-500/50 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 6.79086 11.8079 5 14.017 5H19.017C21.2261 5 23.017 6.79086 23.017 9V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM3.01699 21L3.01699 18C3.01699 16.8954 3.91242 16 5.01699 16H8.01699C8.56927 16 9.01699 15.5523 9.01699 15V9C9.01699 8.44772 8.56927 8 8.01699 8H4.01699C3.46471 8 3.01699 8.44772 3.01699 9V12C3.01699 12.5523 2.56927 13 2.01699 13H0.0169922C-0.535292 13 -1.01699 12.5523 -1.01699 12V9C-1.01699 6.79086 0.773867 5 2.983 5H8.01699C10.2261 5 12.017 6.79086 12.017 9V15C12.017 18.3137 9.33072 21 6.01699 21H3.01699Z" />
          </svg>
          <p className="text-xl italic font-medium leading-relaxed text-gray-100">
            "{current.quote}"
          </p>
          <p className="mt-2 text-indigo-400 font-bold opacity-80">— {current.author}</p>
        </div>

        <div className="pt-6 border-t border-white/10">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-3">
            Pro Tip
          </span>
          <p className="text-sm text-gray-300 font-medium">
            {current.tip}
          </p>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-4 right-8 flex gap-1.5 z-20">
        {wisdomData.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-indigo-500' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Wisdom;
