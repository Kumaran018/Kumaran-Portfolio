import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Lock, Mail, ArrowLeft, ShieldAlert } from 'lucide-react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminUser', JSON.stringify(res.data));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center px-6 overflow-hidden">
      {/* Glow spots */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] bg-accent-blue/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-accent-purple/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Back button */}
      <Link 
        to="/"
        className="absolute top-8 left-8 flex items-center space-x-2 text-white/50 hover:text-white transition-colors text-sm tracking-wider"
      >
        <ArrowLeft size={16} />
        <span>Back to Portfolio</span>
      </Link>

      {/* Login Card */}
      <GlassCard className="max-w-md w-full p-8" glowColor="rgba(134, 34, 230, 0.15)">
        <div className="flex flex-col items-center space-y-3 text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-purple border border-accent-purple/20">
            <ShieldAlert size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide font-sans">Admin Portal</h2>
          <p className="text-xs text-white/40 font-light leading-relaxed">
            Secure authentication required to edit portfolio files.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input rounded-xl py-3 pl-12 pr-4 text-xs text-white"
                placeholder="admin@portfolio.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Secure Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input rounded-xl py-3 pl-12 pr-4 text-xs text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <GlowingButton 
            type="submit" 
            variant="accent" 
            className="w-full mt-4"
            disabled={loading}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </GlowingButton>
        </form>
      </GlassCard>
    </div>
  );
}
