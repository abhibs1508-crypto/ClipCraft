import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Terminal, Sparkles, Cpu, Code } from 'lucide-react';
import Card from '../components/ui/Card';
import { FadeUp } from '../components/ui/Reveal';

const TECH_CATEGORIES = [
  {
    title: 'Frontend Ecosystem',
    icon: Code,
    skills: [
      { name: 'React.js', level: 'Expert', desc: 'Component life, hooks, state hooks' },
      { name: 'Next.js', level: 'Expert', desc: 'SSR, App router, server actions' },
      { name: 'Vite', level: 'Advanced', desc: 'Fast bundling, dev setups' },
      { name: 'Framer Motion', level: 'Expert', desc: 'Spring physics, complex chains' },
      { name: 'Tailwind CSS', level: 'Expert', desc: 'Utility architectures, configs' },
    ],
    color: 'rgba(59, 130, 246, 0.15)', // blue
  },
  {
    title: 'Backend & Pipelines',
    icon: Terminal,
    skills: [
      { name: 'Node.js', level: 'Advanced', desc: 'Express, async pipelines' },
      { name: 'GraphQL / REST', level: 'Advanced', desc: 'Schema designs, resolvers' },
      { name: 'PostgreSQL', level: 'Intermediate', desc: 'Indexes, relational models' },
      { name: 'WebSockets', level: 'Advanced', desc: 'Realtime events pipelines' },
    ],
    color: 'rgba(124, 58, 237, 0.15)', // purple
  },
  {
    title: 'Creative Systems',
    icon: Sparkles,
    skills: [
      { name: 'Figma Design', level: 'Expert', desc: 'Auto layout, design systems' },
      { name: 'WebGL / Three.js', level: 'Intermediate', desc: '3D vertex, shader maps' },
      { name: 'Adobe Suite', level: 'Advanced', desc: 'Vector layout, illustrations' },
    ],
    color: 'rgba(6, 182, 212, 0.15)', // cyan
  },
];

const Technologies = () => {
  return (
    <section className="py-[120px] relative overflow-hidden bg-[#111827]/10">
      {/* Container class */}
      <div className="ds-container relative z-10">
        
        {/* Header Block */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-highlight text-xs font-mono font-bold uppercase tracking-[0.18em]">Stack Integrations</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">Our Technology Stack</h2>
            <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
              We employ modern tools to ensure the highest fidelity layouts. Here are the core languages and frameworks in our pipeline.
            </p>
          </div>
        </FadeUp>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TECH_CATEGORIES.map((category, idx) => {
            const Icon = category.icon;
            return (
              <FadeUp key={category.title} delay={idx * 0.1}>
                <Card
                  glowColor={category.color}
                  className="p-8 h-full flex flex-col justify-start text-left border-white/5"
                >
                  {/* Category Title */}
                  <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">{category.title}</h3>
                  </div>

                  {/* Skills List inside card */}
                  <div className="flex flex-col gap-4">
                    {category.skills.map((skill) => (
                      <div 
                        key={skill.name}
                        className="group/skill flex justify-between items-start border-b border-white/5 pb-3 last:border-b-0 last:pb-0"
                      >
                        <div className="text-left">
                          <h4 className="font-medium text-sm text-white group-hover/skill:text-accent transition-colors duration-200">
                            {skill.name}
                          </h4>
                          <p className="text-[10px] text-gray-500 mt-0.5">{skill.desc}</p>
                        </div>
                        <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded font-mono text-gray-300">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Technologies;
