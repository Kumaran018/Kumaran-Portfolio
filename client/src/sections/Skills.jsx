import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Code2, Server, Database, Layers } from 'lucide-react';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Full Spectrum', icon: Layers },
    { id: 'programming', name: 'Languages', icon: Code2 },
    { id: 'web', name: 'Web Architectures', icon: Server },
    { id: 'tools', name: 'Data & Environment', icon: Database },
  ];

  const skillItems = [
    // Programming
    { name: 'Python', category: 'programming', proficiency: 90, color: '#306998', icon: '🐍' },
    { name: 'Java', category: 'programming', proficiency: 75, color: '#f89820', icon: '☕' },
    { name: 'C++', category: 'programming', proficiency: 70, color: '#00599c', icon: '👾' },
    
    // Web & MERN
    { name: 'HTML5 / CSS3', category: 'web', proficiency: 95, color: '#e34f26', icon: '🎨' },
    { name: 'JavaScript (ES6+)', category: 'web', proficiency: 88, color: '#f7df1e', icon: '⚡' },
    { name: 'React.js', category: 'web', proficiency: 85, color: '#61dafb', icon: '⚛️' },
    { name: 'Node.js', category: 'web', proficiency: 80, color: '#339933', icon: '🟢' },
    { name: 'Express.js', category: 'web', proficiency: 78, color: '#ffffff', icon: '🛠️' },
    { name: 'Django (Python)', category: 'web', proficiency: 85, color: '#092e20', icon: '💚' },
    { name: 'Bootstrap 5', category: 'web', proficiency: 90, color: '#7952b3', icon: '🥾' },
    
    // DB & Tools
    { name: 'MongoDB', category: 'tools', proficiency: 80, color: '#47a248', icon: '🍃' },
    { name: 'SQLite', category: 'tools', proficiency: 85, color: '#003b57', icon: '💾' },
    { name: 'Git & GitHub', category: 'tools', proficiency: 85, color: '#f05032', icon: '🐙' },
    { name: 'VS Code', category: 'tools', proficiency: 90, color: '#007acc', icon: '💻' },
    { name: 'Canva', category: 'tools', proficiency: 70, color: '#00c4cc', icon: '📐' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillItems 
    : skillItems.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative w-screen min-h-screen py-32 px-8 md:px-24 bg-transparent overflow-hidden flex flex-col justify-center select-none">
      
      {/* Background radial highlight */}
      <div className="absolute top-[30%] left-[20%] w-[550px] h-[550px] bg-accent-blue/5 rounded-full blur-[110px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[-150px] w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[110px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <p className="text-accent-purple text-xs uppercase tracking-[0.4em] font-semibold mb-3">Skill matrix</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white font-sans">
            Technical Arsenal
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan rounded mt-6" />
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap items-center gap-3 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2.5 py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-white text-black shadow-[0_5px_15px_rgba(255,255,255,0.15)] font-bold'
                    : 'bg-white/[0.02] text-white/50 border border-white/5 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={14} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skill card matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, idx) => (
            <GlassCard 
              key={idx} 
              className="flex flex-col justify-between h-44 group"
              glowColor={`${skill.color}25`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                      {skill.icon}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide font-sans">{skill.name}</h3>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold font-mono mt-0.5">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                  
                  <span className="text-xs font-bold font-mono text-white/60">
                    {skill.proficiency}%
                  </span>
                </div>
              </div>

              {/* Progress visual */}
              <div className="w-full space-y-2 pt-6">
                <div className="h-[2px] bg-white/[0.03] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_12px_currentColor]"
                    style={{ 
                      width: `${skill.proficiency}%`, 
                      backgroundColor: skill.color,
                      color: skill.color
                    }}
                  />
                </div>
                
                {/* Level Tag indicator */}
                <div className="flex justify-between items-center text-[9px] text-white/30 uppercase tracking-wider font-semibold">
                  <span>Adoption</span>
                  <span className="text-white/60">
                    {skill.proficiency >= 90 ? 'Expert' : skill.proficiency >= 80 ? 'Proficient' : 'Advanced'}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
