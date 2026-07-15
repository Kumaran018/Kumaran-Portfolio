import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Github, Code2, Globe } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import axios from 'axios';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        } else {
          setProjects(resumeData.projects);
        }
      } catch (err) {
        console.warn('API error, using local fallback:', err.message);
        setProjects(resumeData.projects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="relative w-screen min-h-screen py-16 px-8 md:px-24 bg-transparent overflow-hidden flex flex-col justify-center select-none">
      
      {/* Visual background lights */}
      <div className="absolute top-[20%] left-[-150px] w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[-150px] w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <p className="text-accent-blue text-xs uppercase tracking-[0.4em] font-semibold mb-3">Interactive Portfolio</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white font-sans">
            Featured Projects
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent-blue to-accent-cyan rounded mt-6" />
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const glowAccents = [
              'rgba(0, 102, 204, 0.25)',
              'rgba(0, 242, 254, 0.25)',
              'rgba(134, 34, 230, 0.25)'
            ];
            const currentGlow = glowAccents[idx % glowAccents.length];

            return (
              <GlassCard 
                key={project.id || project._id} 
                className="flex flex-col h-full justify-between"
                glowColor={currentGlow}
              >
                <div className="space-y-6">
                  {/* Decorative Project Frame */}
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-white/10 transition-all duration-300">
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 z-10" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 z-10" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 z-10" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 z-10" />
                    
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <Code2 size={40} className="text-white/25 group-hover:scale-110 group-hover:text-accent-blue transition-all duration-500" />
                    )}
                  </div>

                  {/* Project description */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white tracking-wide font-sans group-hover:text-accent-blue transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/40 leading-relaxed font-light line-clamp-4 font-sans">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer and tags */}
                <div className="space-y-5 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-[9px] uppercase tracking-wider font-semibold text-white/60 bg-white/[0.04] py-1 px-3 rounded-full border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 pt-2">
                    <a 
                      href={project.githubLink || 'https://github.com'} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <GlowingButton variant="secondary" className="w-full text-xs py-2 px-3">
                        <Github size={14} />
                        <span>Source Code</span>
                      </GlowingButton>
                    </a>

                    <a 
                      href={project.liveLink || '#'} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <GlowingButton variant="glow" className="w-full text-xs py-2 px-3">
                        <Globe size={14} />
                        <span>Live Demo</span>
                      </GlowingButton>
                    </a>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
