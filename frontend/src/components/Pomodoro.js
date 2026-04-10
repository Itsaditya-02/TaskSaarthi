import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('Work'); // Work, Short Break, Long Break

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound or notification here
      if (mode === 'Work') {
        alert('Work session finished! Take a break.');
      } else {
        alert('Break finished! Ready to focus?');
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (newMode, minutes) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(minutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="glass p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-900/40 to-black/40 text-center relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
      
      <h3 className="text-xl font-bold font-outfit mb-4 flex items-center justify-center gap-2">
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Pomodoro Focus
      </h3>

      <div className="flex justify-center gap-2 mb-6 p-1 bg-white/5 rounded-2xl w-fit mx-auto">
        {[
          { label: 'Focus', mode: 'Work', mins: 25 },
          { label: 'Break', mode: 'Short Break', mins: 5 },
        ].map((item) => (
          <button
            key={item.mode}
            onClick={() => resetTimer(item.mode, item.mins)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mode === item.mode ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="text-6xl font-black font-outfit mb-6 tracking-tighter text-white tabular-nums">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-3 rounded-2xl font-bold transition-all shadow-lg ${
            isActive 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20'
          }`}
        >
          {isActive ? 'Pause' : 'Start Focus'}
        </button>
        <button
          onClick={() => resetTimer(mode, mode === 'Work' ? 25 : 5)}
          className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <p className="text-[10px] uppercase tracking-widest text-indigo-400/60 font-black mt-6">
        {mode === 'Work' ? 'Deep Work Session' : 'Rest & Recharge'}
      </p>
    </div>
  );
};

export default Pomodoro;
