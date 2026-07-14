import React from 'react';
import GlassCard from '../components/GlassCard';
import { Calendar, Briefcase, Trophy, Zap } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Experience() {
  return (
    <section id="experience" className="relative w-screen min-h-screen py-32 px-8 md:px-24 bg-transparent overflow-hidden flex flex-col justify-center select-none">
      
      {/* Background glow flares */}
      <div className="absolute top-[30%] left-[-150px] w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[-150px] w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <p className="text-accent-blue text-xs uppercase tracking-[0.4em] font-semibold mb-3">Timeline history</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white font-sans">
            Experience & Hackathons
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent-blue to-accent-purple rounded mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Experience & Internships (7 columns) */}
          <div className="lg:col-span-7 space-y-10">
            <h3 className="text-2xl font-bold text-white flex items-center space-x-3 mb-6 font-sans">
              <Briefcase size={22} className="text-accent-blue" />
              <span>Professional Timeline</span>
            </h3>

            <div className="space-y-12 relative border-l-2 border-white/5 pl-8 ml-3">
              {resumeData.experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline point indicator */}
                  <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-black border-2 border-accent-blue flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-blue group-hover:bg-accent-cyan" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h4 className="text-xl font-bold text-white tracking-wide font-sans">{exp.title}</h4>
                        <p className="text-accent-blue text-xs font-bold uppercase tracking-widest mt-1">{exp.company}</p>
                      </div>
                      
                      <span className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-wider font-bold text-white/50 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-full">
                        <Calendar size={12} />
                        <span>{exp.dateRange}</span>
                      </span>
                    </div>

                    <ul className="space-y-3 pl-4 list-disc text-xs md:text-sm text-white/40 font-light leading-relaxed font-sans">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="hover:text-white/80 transition-colors">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Hackathons (5 columns) */}
          <div className="lg:col-span-5 space-y-10">
            <h3 className="text-2xl font-bold text-white flex items-center space-x-3 mb-6 font-sans">
              <Trophy size={22} className="text-accent-purple" />
              <span>Hackathons & Achievements</span>
            </h3>

            <div className="space-y-8">
              {resumeData.hackathons.map((hack, idx) => (
                <GlassCard 
                  key={idx} 
                  className="space-y-5" 
                  glowColor="rgba(134, 34, 230, 0.15)"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-wide font-sans leading-snug">{hack.name}</h4>
                      <span className="inline-block text-[9px] uppercase tracking-widest font-bold text-accent-purple bg-accent-purple/10 border border-accent-purple/10 py-1 px-3 rounded-full mt-2">
                        {hack.location}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple">
                      <Zap size={18} />
                    </div>
                  </div>
                  
                  <ul className="space-y-3 list-disc pl-4 text-xs text-white/40 font-light leading-relaxed font-sans">
                    {hack.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="hover:text-white/70 transition-colors">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
