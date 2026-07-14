import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { Award, ShieldCheck, Search } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import axios from 'axios';

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await axios.get('/api/certificates');
        if (res.data && res.data.length > 0) {
          setCerts(res.data);
        } else {
          setCerts(resumeData.certifications);
        }
      } catch (err) {
        console.warn('API error, using local fallback:', err.message);
        setCerts(resumeData.certifications);
      }
    };
    fetchCerts();
  }, []);

  const filteredCerts = certs.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="certifications" className="relative w-screen min-h-screen py-32 px-8 md:px-24 bg-transparent overflow-hidden flex flex-col justify-center select-none">
      {/* Light effect */}
      <div className="absolute right-[-100px] top-[20%] w-[450px] h-[450px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section header & Search box */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-accent-blue text-xs uppercase tracking-[0.4em] font-semibold mb-3">Credentials</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white font-sans">
              Certifications
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-accent-blue to-accent-cyan rounded mt-6" />
          </div>

          {/* Search inputs */}
          <div className="relative max-w-xs w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search credentials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass-input rounded-full py-2.5 pl-11 pr-4 text-xs text-white"
            />
          </div>
        </div>

        {/* Certifications cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, index) => (
            <GlassCard 
              key={cert.id || cert._id || index}
              className="flex items-center space-x-4 p-5 border border-white/5"
              glowColor="rgba(0, 102, 204, 0.15)"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
                <Award size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white leading-snug tracking-wide line-clamp-2 font-sans">
                  {cert.title}
                </h3>
                <div className="flex items-center space-x-1.5 text-xs text-white/40 font-medium font-sans">
                  <ShieldCheck size={12} className="text-accent-cyan" />
                  <span>{cert.issuer}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
