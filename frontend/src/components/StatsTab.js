import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, CheckCircle, Clock, Calendar } from 'lucide-react';

const StatsTab = ({ tasks }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  const pieData = [
    { name: 'Completed', value: completedCount, color: '#6366f1' },
    { name: 'Pending', value: pendingCount, color: '#f43f5e' },
  ];

  const chartData = [
    { name: 'Mon', tasks: 3 },
    { name: 'Tue', tasks: 5 },
    { name: 'Wed', tasks: 2 },
    { name: 'Thu', tasks: 8 },
    { name: 'Fri', tasks: 6 },
    { name: 'Sat', tasks: 10 },
    { name: 'Sun', tasks: 4 },
  ];

  const stats = [
    { label: 'Total Tasks', value: tasks.length, icon: <Calendar />, color: 'text-blue-400' },
    { label: 'Completed', value: completedCount, icon: <CheckCircle />, color: 'text-green-400' },
    { label: 'Completion Rate', value: `${tasks.length ? Math.round((completedCount/tasks.length)*100) : 0}%`, icon: <TrendingUp />, color: 'text-indigo-400' },
    { label: 'Active Streak', value: '4 days', icon: <Clock />, color: 'text-orange-400' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <h2 className="text-3xl font-black font-outfit mb-8">Performance Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-3xl border border-white/5"
          >
            <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-4 ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-3xl font-black font-outfit">{s.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 glass p-8 rounded-[2.5rem] border border-white/5">
          <h3 className="text-xl font-bold mb-8">Productivity Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#6366f1' }}
                />
                <Area type="monotone" dataKey="tasks" stroke="#6366f1" fillOpacity={1} fill="url(#colorTasks)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4 w-full">Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-sm text-gray-400">{d.name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTab;
