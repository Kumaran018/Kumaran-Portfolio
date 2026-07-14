import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import axios from 'axios';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errMessage, setErrMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrMessage('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    try {
      await axios.post('/api/messages', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0066cc', '#8622e6', '#00ffff']
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrMessage(err.response?.data?.message || 'Something went wrong, please try again.');
    }
  };

  return (
    <section id="contact" className="relative w-screen min-h-screen py-32 px-8 md:px-24 bg-transparent overflow-hidden flex flex-col justify-center select-none">
      {/* Glow highlight */}
      <div className="absolute left-[10%] bottom-[-50px] w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section header */}
        <div className="mb-20 max-w-2xl">
          <p className="text-accent-blue text-xs uppercase tracking-[0.4em] font-semibold mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white font-sans">
            Contact Me
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent-blue to-accent-cyan rounded mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: Info columns (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-wide font-sans">Let's build something epic</h3>
              <p className="text-white/50 text-sm md:text-base font-light leading-relaxed font-sans">
                If you are looking for a motivated Full Stack Developer Intern or want to build an enterprise web application, drop me a message. I am always open to new opportunities.
              </p>
            </div>

            {/* Direct contact info panels */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email</h4>
                  <a href={`mailto:${resumeData.contact.email}`} className="text-sm font-semibold text-white hover:text-accent-blue transition-colors font-sans">
                    {resumeData.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Phone</h4>
                  <a href={`tel:${resumeData.contact.phone}`} className="text-sm font-semibold text-white hover:text-accent-purple transition-colors font-sans">
                    +91 {resumeData.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Location</h4>
                  <span className="text-sm font-semibold text-white font-sans">
                    {resumeData.contact.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form columns (7 columns) */}
          <div className="lg:col-span-7">
            <GlassCard className="h-full p-8" glowColor="rgba(0, 102, 204, 0.15)">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-12 space-y-4">
                  <CheckCircle2 size={64} className="text-accent-blue animate-pulse" />
                  <h3 className="text-2xl font-bold text-white font-sans">Message Sent!</h3>
                  <p className="text-white/50 text-sm max-w-sm font-sans">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <GlowingButton variant="secondary" onClick={() => setStatus('idle')}>
                    Send another message
                  </GlowingButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg font-bold text-white mb-2 font-sans">Send a Message</h3>
                  
                  {status === 'error' && (
                    <div className="flex items-center space-x-2 text-xs text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/25">
                      <AlertTriangle size={14} />
                      <span>{errMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full glass-input rounded-xl p-3 text-xs text-white"
                        placeholder="Kumaran"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full glass-input rounded-xl p-3 text-xs text-white"
                        placeholder="name@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full glass-input rounded-xl p-3 text-xs text-white"
                      placeholder="Collaboration inquiry"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full glass-input rounded-xl p-3 text-xs text-white resize-none"
                      placeholder="Hi, I'd like to talk about..."
                    />
                  </div>

                  <GlowingButton 
                    type="submit" 
                    variant="accent" 
                    className="w-full mt-2"
                    disabled={status === 'submitting'}
                  >
                    <Send size={14} />
                    <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                  </GlowingButton>
                </form>
              )}
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
}
