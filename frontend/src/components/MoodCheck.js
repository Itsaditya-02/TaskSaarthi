import React, { useState, useEffect } from 'react';

const MoodCheck = () => {
  const [show, setShow] = useState(false);
  const [mood, setMood] = useState(null);

  useEffect(() => {
    const lastCheck = localStorage.getItem('lastMoodCheck');
    const today = new Date().toDateString();
    
    if (lastCheck !== today) {
      setTimeout(() => setShow(true), 1500);
    } else {
      setMood(localStorage.getItem('todayMood'));
    }
  }, []);

  const handleSelect = (m) => {
    localStorage.setItem('lastMoodCheck', new Date().toDateString());
    localStorage.setItem('todayMood', m);
    setMood(m);
    setShow(false);
    // Dispatch event to update top bar if needed
    window.dispatchEvent(new Event('moodUpdated'));
  };

  if (!show) return null;

  const moods = [
    { emoji: '😴', label: 'Tired' },
    { emoji: '😕', label: 'Unsure' },
    { emoji: '😐', label: 'OK' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '🚀', label: 'Productive' },
  ];

  return (
    <div className="fixed bottom-10 right-10 z-[100] animate-slide-up">
      <div className="glass p-6 rounded-[2rem] shadow-2xl border border-indigo-500/20 max-w-sm">
        <h3 className="text-lg font-bold font-outfit text-white mb-2">How are you feeling today?</h3>
        <p className="text-gray-400 text-sm mb-6">Your mood helps us tailor your productivity tips.</p>
        <div className="flex justify-between gap-2">
          {moods.map((m) => (
            <button
              key={m.emoji}
              onClick={() => handleSelect(m.emoji)}
              className="w-12 h-12 flex items-center justify-center text-2xl bg-white/5 hover:bg-indigo-600/20 rounded-2xl transition-all hover:scale-110 active:scale-90"
              title={m.label}
            >
              {m.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodCheck;
