import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Zap, Star } from 'lucide-react';

const Quests = ({ tasks, xp, streak }) => {
  const quests = [
    { 
      id: 1, 
      title: 'Daily Warrior', 
      desc: 'Complete 5 tasks today', 
      progress: tasks.filter(t => t.completed).length, 
      target: 5, 
      reward: '50 XP',
      icon: <Zap className="text-yellow-400" />
    },
    { 
      id: 2, 
      title: 'Consistency King', 
      desc: 'Maintain a 7-day streak', 
      progress: streak, 
      target: 7, 
      reward: '200 XP',
      icon: <Trophy className="text-orange-400" />
    },
    { 
      id: 3, 
      title: 'High Priority Hero', 
      desc: 'Complete 3 High priority tasks', 
      progress: tasks.filter(t => t.completed && t.priority === 'high').length, 
      target: 3, 
      reward: '100 XP',
      icon: <Star className="text-purple-400" />
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black font-outfit mb-8">Available Quests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quests.map((quest) => (
          <motion.div 
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-3xl relative overflow-hidden group border border-white/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                {quest.icon}
              </div>
              <span className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {quest.reward}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-1">{quest.title}</h3>
            <p className="text-gray-400 text-sm mb-6">{quest.desc}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>Progress</span>
                <span>{quest.progress}/{quest.target}</span>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((quest.progress / quest.target) * 100, 100)}%` }}
                  className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Quests;
