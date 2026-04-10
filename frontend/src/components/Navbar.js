import React, { useState } from 'react';

const Navbar = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/40">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold font-outfit text-white tracking-tight hidden sm:block">TaskSaarthi</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/5 magnetic-item"
        >
          <img
            src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-indigo-500/50"
          />
          <span className="text-sm font-medium text-gray-300 hidden sm:block">{user?.name}</span>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 glass rounded-2xl shadow-2xl border border-white/5 overflow-hidden animate-fade-in">
            <div className="py-2">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                Settings
              </button>
              <div className="h-[1px] bg-white/5 my-1"></div>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
