import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth = ({ onLogin }) => {
  console.log('Auth logic start');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = 'Required';
    if (!formData.password) newErrors.password = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.fullName, email: formData.email, password: formData.password };
      
      const res = await axios.post(endpoint, payload);
      onLogin(res.data);
    } catch (err) {
      setErrors({ server: err.response?.data?.message || 'Authentication failed' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0a0e1a] relative overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
           <motion.div 
             animate={{ rotate: [0, 10, -10, 0] }}
             transition={{ repeat: Infinity, duration: 5 }}
             className="inline-flex p-4 rounded-2xl bg-indigo-500/10 mb-6 border border-indigo-500/20"
           >
             <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
             </svg>
           </motion.div>
           <h1 className="text-4xl font-black font-outfit text-white tracking-tighter">TaskSaarthi</h1>
           <p className="text-gray-400 mt-2 text-sm font-medium">Your personal quest for productivity starts here.</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-3xl bg-white/[0.02]">
           <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${isLogin ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Log In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${!isLogin ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Sign Up
              </button>
           </div>

           <form onSubmit={handleSubmit} className="space-y-4">
              {errors.server && <p className="text-red-500 text-xs text-center font-bold bg-red-500/10 py-2 rounded-xl border border-red-500/20">{errors.server}</p>}
              
              {!isLogin && (
                <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                   <input
                     type="text"
                     placeholder="Full Name"
                     className="input-field !pl-12"
                     value={formData.fullName}
                     onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                   />
                </div>
              )}

              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                 <input
                   type="email"
                   placeholder="Email Address"
                   className="input-field !pl-12"
                   value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                 />
              </div>

              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                 <input
                   type="password"
                   placeholder="Password"
                   className="input-field !pl-12"
                   value={formData.password}
                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                 />
              </div>

              {!isLogin && (
                <div className="relative">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                   <input
                     type="password"
                     placeholder="Confirm Password"
                     className="input-field !pl-12"
                     value={formData.confirmPassword}
                     onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                   />
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary h-14 mt-4 flex items-center justify-center gap-2 group"
              >
                {loading ? 'Processing...' : (isLogin ? 'Continue' : 'Create Account')}
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
           </form>

         </div>

        <p className="mt-8 text-center text-gray-500 text-xs font-medium">
           {isLogin ? "New to the quest?" : "Already a hero?"}
           <button 
             onClick={() => setIsLogin(!isLogin)}
             className="ml-2 text-indigo-400 font-bold hover:underline"
           >
             {isLogin ? 'Join us now' : 'Sign in here'}
           </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
