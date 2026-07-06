import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Zap, Compass, ShieldCheck } from 'lucide-react';
import Card from '../components/ui/Card';
import { FadeUp, FadeLeft } from '../components/ui/Reveal';

const PILLARS = [
  {
    icon: Palette,
    title: 'Aesthetics & Emotion',
    description: 'We believe digital experiences should spark emotional connections through rich visuals, curated colors, and modern layout balance.',
    color: 'rgba(124, 58, 237, 0.15)', // purple
  },
  {
    icon: Zap,
    title: 'High-Octane Performance',
    description: 'A beautiful site that loads slowly is a failure. We structure React architectures to build clean, static, lightweight bundles.',
    color: 'rgba(59, 130, 246, 0.15)', // blue
  },
  {
    icon: Compass,
    title: 'Intuitive Motion Design',
    description: 'Transitions and scrolls are not afterthought decorations. They guide the user’s eyes and provide subtle context to interactions.',
    color: 'rgba(6, 182, 212, 0.15)', // cyan
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Scalability',
    description: 'We compile organized, modular, clean source code. Scaling features, integrations, and content remains fully maintainable.',
    color: 'rgba(34, 197, 94, 0.15)', // green
  },
];

const About = () => {
  return (
    <section id="about" className="py-[120px] relative overflow-hidden">
      {/* Container class */}
      <div className="ds-container relative z-10">
        
        {/* Header Block (Reveal once) */}
        <FadeUp>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-8 text-left">
            <div>
              <span className="text-highlight text-xs font-mono font-bold uppercase tracking-[0.18em]">Who We Are</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">Elevating Web Standards</h2>
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed">
              AETHERIA is a collaborative studio of developers, designers, and creative directors focused on shaping the high-end boutique web ecosystem.
            </p>
          </div>
        </FadeUp>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Intro (Reveal once) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <FadeUp delay={0.1}>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-snug text-white">
                We don't build generic templates. We construct digital monuments.
              </h3>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Every pixel is evaluated. Every transition is timed. Our team designs products that work flawlessly, but more importantly, communicate your brand’s authority.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-gray-400 text-sm leading-relaxed">
                Based globally, we cooperate with venture-backed startups, premium brands, and creative leaders who refuse to blend into standard template structures. We work at the intersection of layout, motion, and speed.
              </p>
            </FadeUp>
          </div>

          {/* Right Cards Grid (Pillars - staggered reveals) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <FadeLeft key={pillar.title} delay={idx * 0.1}>
                  <Card 
                    glowColor={pillar.color}
                    className="p-6 h-full flex flex-col justify-between items-start text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-lg text-white mb-2">{pillar.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{pillar.description}</p>
                    </div>
                  </Card>
                </FadeLeft>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
