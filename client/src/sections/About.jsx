import React from 'react';
import GlassCard from '../components/GlassCard';
import { Award, GraduationCap, MapPin, Globe, Calendar } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function About() {
  return (
    <section id="about" className="relative w-screen min-h-screen py-16 px-8 md:px-24 bg-transparent overflow-hidden flex flex-col justify-center select-none">
      
      {/* Background glow effects */}
      <div className="absolute top-[20%] right-[-150px] w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[-150px] w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <p className="text-accent-blue text-xs uppercase tracking-[0.4em] font-semibold mb-3">Professional Bio</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white font-sans">
            About Me
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent-blue to-accent-cyan rounded mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Summary & stats (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <GlassCard className="h-full flex flex-col justify-between" glowColor="rgba(0, 102, 204, 0.15)">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white tracking-wide font-sans">
                  Detail-Oriented Full Stack Developer
                </h3>
                <p className="text-sm md:text-base text-white/60 font-light leading-relaxed font-sans">
                  {resumeData.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-8 mt-8 border-t border-white/5 text-white/40 text-xs">
                <span className="flex items-center gap-2 bg-white/[0.02] border border-white/5 py-2 px-4 rounded-full">
                  <MapPin size={14} className="text-accent-blue" />
                  <span className="font-semibold text-white/70">Coimbatore, India</span>
                </span>
                <span className="flex items-center gap-2 bg-white/[0.02] border border-white/5 py-2 px-4 rounded-full">
                  <GraduationCap size={14} className="text-accent-blue" />
                  <span className="font-semibold text-white/70">AI & Data Science Student</span>
                </span>
              </div>
            </GlassCard>

            {/* Quick Stats list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GlassCard glowColor="rgba(134, 34, 230, 0.15)">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Academic CGPA</h4>
                    <p className="text-white font-black text-2xl tracking-wide font-sans mt-0.5">8.04 / 10</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard glowColor="rgba(0, 102, 204, 0.15)">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Typewriting Grade</h4>
                    <p className="text-white font-black text-lg tracking-wider font-sans uppercase mt-0.5">Senior Grade</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* RIGHT: Education & Languages (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Education Profile */}
            <GlassCard className="flex-1" glowColor="rgba(0, 102, 204, 0.15)">
              <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6 font-sans">
                <GraduationCap className="text-accent-blue" />
                <span>Education Path</span>
              </h3>
              
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="space-y-3 border-l border-white/10 pl-5 ml-2 relative">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-blue" />
                  
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white tracking-wide font-sans">{edu.degree}</h4>
                    <p className="text-xs text-accent-blue font-semibold">{edu.fieldOfStudy}</p>
                    <p className="text-xs text-white/40 font-medium">{edu.institution}</p>
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-white/30 pt-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {edu.dateRange}
                    </span>
                    <span>CGPA: {edu.cgpa}</span>
                  </div>
                </div>
              ))}
            </GlassCard>

            {/* Languages profiles */}
            <GlassCard glowColor="rgba(134, 34, 230, 0.15)">
              <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6 font-sans">
                <Globe className="text-accent-purple" />
                <span>Linguistic Range</span>
              </h3>
              
              <div className="space-y-3">
                {resumeData.languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
                    <span className="text-sm font-semibold text-white font-sans">{lang.name}</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-accent-purple bg-accent-purple/10 py-1 px-3.5 rounded-full border border-accent-purple/10">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>

        </div>
      </div>
    </section>
  );
}
