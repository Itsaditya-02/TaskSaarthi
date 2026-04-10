import React from 'react';
import { LayoutDashboard, CheckCircle2, Timer, BarChart3, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setTab, onLogout }) => {
  const links = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'tasks', label: 'Quests', icon: <CheckCircle2 size={20} /> },
    { id: 'focus', label: 'Focus', icon: <Timer size={20} /> },
    { id: 'stats', label: 'Stats', icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside className="w-20 lg:w-64 h-screen fixed left-0 top-0 glass border-r border-white/5 p-4 flex flex-col z-50">
      <div className="flex items-center gap-3 px-4 py-8 mb-6">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 className="text-xl font-black font-outfit text-white tracking-tight hidden lg:block">TaskSaarthi</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => setTab(link.id)}
            className={`sidebar-link w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
              activeTab === link.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 font-bold' 
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            {link.icon}
            <span className="hidden lg:block text-sm">{link.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="p-4 bg-indigo-600/5 rounded-2xl hidden lg:block border border-indigo-500/10">
          <p className="text-xs text-indigo-400 font-bold mb-1 uppercase tracking-widest">Level 4</p>
          <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
             <div className="h-full w-2/3 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold"
        >
          <LogOut size={20} />
          <span className="hidden lg:block text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
