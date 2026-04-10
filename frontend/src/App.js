import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit3, X, Calendar, Tag, ChevronRight, LayoutDashboard, CheckSquare, Timer, BarChart3, CloudRain, Sun } from "lucide-react";
import Auth from "./components/Auth";
import Sidebar from "./components/Sidebar";
import Pomodoro from "./components/Pomodoro";
import Wisdom from "./components/Wisdom";
import ProgressRing from "./components/ProgressRing";
import MoodCheck from "./components/MoodCheck";
import Cursor, { useMagnetic } from "./components/Cursor";
import QuestsTab from "./components/QuestsTab";
import StatsTab from "./components/StatsTab";

// Configure axios base URL
axios.defaults.baseURL = "http://localhost:5000/api";

function App() {
  useMagnetic();
  // AUTH & UI STATE
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLightMode, setIsLightMode] = useState(false);
  const [todayMood, setTodayMood] = useState(localStorage.getItem('todayMood'));

  // APP DATA STATE
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("work");
  const [dueDate, setDueDate] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  // AUTH CONFIG
  useEffect(() => {
    // Check for token in URL (from OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    const urlUser = urlParams.get('user');

    if (urlToken && urlUser) {
      handleLogin({ token: urlToken, user: JSON.parse(decodeURIComponent(urlUser)) });
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const savedUser = localStorage.getItem('user');
      if (savedUser && savedUser !== 'undefined') {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setXp(parsed.xp || 0);
          setStreak(parsed.streak || 0);
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    }
    
    const savedMode = localStorage.getItem('lightMode') === 'true';
    setIsLightMode(savedMode);
    if (savedMode) document.body.classList.add('light-mode');

    setIsLoaded(true);
  }, [token]);

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) { console.error("Fetch error:", err); }
  }, [token]);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, fetchTasks]);

  const handleLogin = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setXp(data.user.xp || 0);
    setStreak(data.user.streak || 0);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const addTask = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingTask) {
        await axios.put(`/tasks/${editingTask._id}`, {
          title, priority, category, dueDate
        });
        setEditingTask(null);
      } else {
        await axios.post("/tasks", {
          title, completed: false, priority, category, dueDate
        });
      }
      setTitle("");
      setPriority("medium");
      setDueDate("");
      fetchTasks();
    } catch (err) { console.error("Add/Update error:", err); }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setPriority(task.priority);
    setCategory(task.category || "work");
    setDueDate(task.dueDate ? task.dueDate.split('T')[0] : "");
  };

  const toggleTask = async (task) => {
    try {
      const newStatus = !task.completed;
      await axios.put(`/tasks/${task._id}`, { completed: newStatus });
      fetchTasks();
      if (newStatus) {
        // Handle XP/Streak logic here or in backend
        setXp(prev => prev + 10);
      }
    } catch (err) { console.error(err); }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const toggleLightMode = () => {
    const nextMode = !isLightMode;
    setIsLightMode(nextMode);
    localStorage.setItem('lightMode', nextMode);
    document.body.classList.toggle('light-mode', nextMode);
  };

  const categories = ['work', 'personal', 'fitness', 'education', 'other'];

  if (!isLoaded) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <>
      <Cursor />
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <div className="min-h-screen flex bg-inherit transition-colors duration-500">
          <Sidebar activeTab={activeTab} setTab={setActiveTab} onLogout={handleLogout} />
          
          <main className="flex-1 ml-20 lg:ml-64 p-6 lg:p-12 relative overflow-x-hidden">
            {/* Header */}
            <motion.header 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12"
            >
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-3xl shadow-inner border border-white/5">
                   {todayMood || '👋'}
                 </div>
                 <div>
                   <h2 className="text-3xl lg:text-4xl font-black font-outfit tracking-tight leading-none mb-1">
                     Hey, {user.name.split(' ')[0]}!
                   </h2>
                   <p className="text-gray-500 font-medium">You have {tasks.filter(t => !t.completed).length} active quests.</p>
                 </div>
              </div>

              <div className="flex items-center gap-4 glass p-3 rounded-[1.5rem] border border-white/5">
                 <div className="flex flex-col gap-1 w-32 px-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-indigo-400">
                      <span>Level {Math.floor(xp/100) + 1}</span>
                      <span>{xp % 100}%</span>
                    </div>
                    <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: `${xp % 100}%` }}
                        className="h-full bg-indigo-500" 
                      />
                    </div>
                 </div>
                 <button onClick={toggleLightMode} className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition-all bg-white/5">
                   {isLightMode ? <CloudRain size={20} className="text-indigo-400" /> : <Sun size={20} className="text-yellow-400" />}
                 </button>
                 <button onClick={handleLogout} className="p-2 w-10 h-10 rounded-xl hover:bg-red-500/10 flex items-center justify-center text-red-500 transition-all">
                   <X size={20} />
                 </button>
              </div>
            </motion.header>

            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div 
                  key="dash"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 xl:grid-cols-3 gap-10"
                >
                  <div className="xl:col-span-2 space-y-10">
                    {/* Promo Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 relative group overflow-hidden">
                        <div className="relative z-10">
                          <h3 className="text-4xl font-black font-outfit mb-1">{streak} Days</h3>
                          <p className="text-indigo-400 text-xs font-black uppercase tracking-widest">Ongoing Streak</p>
                        </div>
                        <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-10 group-hover:scale-110 transition-transform">🔥</div>
                      </div>
                      <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 relative group overflow-hidden">
                        <div className="relative z-10">
                          <h3 className="text-4xl font-black font-outfit mb-1">{tasks.filter(t => t.completed).length}</h3>
                          <p className="text-green-400 text-xs font-black uppercase tracking-widest">Tasks Mastered</p>
                        </div>
                        <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-10 group-hover:scale-110 transition-transform">🏆</div>
                      </div>
                    </div>

                    {/* Form Section */}
                    <div className="glass p-4 lg:p-10 rounded-[3rem] border border-white/5 relative bg-white/[0.02]">
                      <h3 className="text-2xl font-bold font-outfit mb-8 flex items-center gap-3">
                        <Plus className="text-indigo-500" /> {editingTask ? 'Edit Quest' : 'New Quest'}
                      </h3>
                      
                      <form onSubmit={addTask} className="space-y-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                          <input
                            className="input-field text-xl lg:text-2xl font-medium tracking-tight h-16"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's your next mission?"
                          />
                          <button type="submit" className="btn-primary h-16 lg:w-48 !px-0 flex items-center justify-center gap-2 text-lg">
                            {editingTask ? <Edit3 size={20} /> : <Plus size={24} />}
                            {editingTask ? 'Update' : 'Launch'}
                          </button>
                          {editingTask && (
                            <button 
                              type="button" 
                              onClick={() => { setEditingTask(null); setTitle(""); }}
                              className="h-16 w-16 glass rounded-2xl flex items-center justify-center text-gray-400 hover:text-white"
                            >
                              <X size={24} />
                            </button>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 items-center">
                          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Priority Level</span>
                            <div className="flex gap-2 p-1.5 bg-black/20 rounded-2xl border border-white/5">
                              {['low', 'medium', 'high'].map(p => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => setPriority(p)}
                                  className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter transition-all ${
                                    priority === p 
                                      ? 'bg-indigo-600 text-white shadow-lg' 
                                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                  }`}
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 flex-1 min-w-[300px]">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Category</span>
                            <div className="flex gap-2 p-1.5 bg-black/20 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
                              {categories.map(c => (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => setCategory(c)}
                                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter transition-all whitespace-nowrap ${
                                    category === c 
                                      ? 'bg-white/10 text-white border border-white/10' 
                                      : 'text-gray-500 hover:text-gray-300'
                                  }`}
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Deadline</span>
                            <div className="flex items-center gap-2 px-5 py-3 h- w-full bg-black/20 rounded-2xl border border-white/5">
                              <Calendar size={14} className="text-indigo-400" />
                              <input 
                                type="date" 
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="bg-transparent text-xs font-black uppercase outline-none text-gray-300 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* List Section */}
                    <div className="space-y-4">
                      {tasks.length === 0 ? (
                        <div className="p-20 text-center glass rounded-[2.5rem] border-dashed border-2 border-white/5">
                          <p className="text-gray-500 font-medium">No active missions. Add one above! 🚀</p>
                        </div>
                      ) : (
                        tasks.map((task, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={task._id} 
                            className={`group flex items-center justify-between p-5 lg:p-6 rounded-[2rem] glass border border-white/5 hover:border-white/10 transition-all ${task.completed ? 'opacity-50' : ''}`}
                          >
                            <div className="flex items-center gap-6 flex-1 min-w-0">
                              <button 
                                onClick={() => toggleTask(task)}
                                className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-green-500 border-green-500' : 'border-white/10 hover:border-indigo-500/50'}`}
                              >
                                {task.completed && <CheckSquare size={16} />}
                              </button>
                              <div className="truncate pr-4 flex flex-col">
                                <span className={`text-lg lg:text-xl font-bold font-outfit truncate ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                                  {task.title}
                                </span>
                                <div className="flex items-center gap-3 mt-1">
                                   <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                     task.priority === 'high' ? 'bg-red-500/10 text-red-500' : task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                                   }`}>
                                     {task.priority}
                                   </span>
                                   <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">
                                     <Tag size={10} /> {task.category}
                                   </span>
                                   {task.dueDate && (
                                     <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                       <Calendar size={10} /> {new Date(task.dueDate).toLocaleDateString()}
                                     </span>
                                   )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => startEdit(task)}
                                className="p-3 glass rounded-xl text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                              >
                                <Edit3 size={18} />
                              </button>
                              <button 
                                onClick={() => deleteTask(task._id)}
                                className="p-3 glass rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="glass p-8 rounded-[3rem] border border-white/5 flex flex-col items-center bg-white/[0.02]">
                      <ProgressRing progress={tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0} />
                      <h4 className="mt-8 font-black text-gray-500 uppercase tracking-widest text-[11px]">Daily Completion</h4>
                      <div className="mt-2 text-2xl font-black font-outfit">{Math.round((tasks.filter(t => t.completed).length / (tasks.length || 1)) * 100)}%</div>
                    </div>
                    <Pomodoro />
                    <Wisdom />
                  </div>
                </motion.div>
              )}

              {activeTab === 'tasks' && (
                 <motion.div key="quests" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <QuestsTab tasks={tasks} xp={xp} streak={streak} />
                 </motion.div>
              )}

              {activeTab === 'focus' && (
                 <motion.div key="focus" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center justify-center p-20 glass rounded-[3rem]">
                    <Timer size={100} className="text-indigo-500 mb-8 animate-pulse" />
                    <h2 className="text-3xl font-bold mb-4">Focus Zone</h2>
                    <p className="text-gray-400 text-center max-w-sm">Deep work mode active. Use the Pomodoro component on the dashboard to track your sessions.</p>
                    <div className="mt-12 w-full max-w-lg space-y-4">
                       <div className="flex justify-between font-bold text-sm text-gray-500 uppercase tracking-widest">
                          <span>Recent Session</span>
                          <span>25:00</span>
                       </div>
                       <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                          <div className="h-full w-full bg-indigo-500/50"></div>
                       </div>
                    </div>
                 </motion.div>
              )}

              {activeTab === 'stats' && (
                 <motion.div key="stats" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <StatsTab tasks={tasks} />
                 </motion.div>
              )}
            </AnimatePresence>

            <MoodCheck />
          </main>
        </div>
      )}
    </>
  );
}

export default App;