import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Code, ShieldCheck, Rocket, ChevronRight, Check } from 'lucide-react';
import Card from '../components/ui/Card';
import { FadeUp } from '../components/ui/Reveal';

const STEPS = [
  {
    num: '01',
    icon: Search,
    title: 'Discovery & Blueprint',
    subtitle: 'Research, competitor study, wireframes',
    description: 'We audit your current asset architecture, analyze competitor user journeys, and establish a functional blueprint. We align on technical scope and content outline.',
    deliverables: ['Functional Scope outline', 'Interactive wireframe mapping', 'Competitive audit reports'],
    color: 'rgba(59, 130, 246, 0.15)', // blue
  },
  {
    num: '02',
    icon: Compass,
    title: 'High-Fidelity UI Design',
    subtitle: 'Luxury aesthetics, styleguide, components',
    description: 'We craft bespoke interface designs in Figma. We define your typography hierarchy, grid system, color palettes, and interactive states to establish visual premium quality.',
    deliverables: ['Custom Figma designs', 'Design system guidelines', 'Micro-interaction mockups'],
    color: 'rgba(124, 58, 237, 0.15)', // purple
  },
  {
    num: '03',
    icon: Code,
    title: 'Frontend Engineering',
    subtitle: 'Clean React code, modular structures',
    description: 'We build your designs into clean, production-ready React codebase. We avoid bloated libraries and plugins, using raw Tailwind CSS and Framer Motion for high-fidelity animations.',
    deliverables: ['Production-ready React source code', 'Fluid animations setup', 'Adaptive layouts testing'],
    color: 'rgba(6, 182, 212, 0.15)', // cyan
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Diagnostics & Audit',
    subtitle: 'Speed audits, SEO configs, testing',
    description: 'We stress-test the website on multiple devices, audit lighthouse scores for performance & accessibility, and configure meta configurations for SEO search engines.',
    deliverables: ['Performance score sheets (>90%)', 'Multi-browser compatibility tests', 'SEO meta tag checks'],
    color: 'rgba(34, 197, 94, 0.15)', // green
  },
  {
    num: '05',
    icon: Rocket,
    title: 'Launch & Expansion',
    subtitle: 'Domain mapping, deployment, handoff',
    description: 'We deploy the code to optimized CDN setups (Vercel, Netlify, or AWS). We configure analytics tags, hand off the GitHub repository, and coordinate the launch event.',
    deliverables: ['CDN DNS configurations', 'Analytics tracking tags', 'Repository handoff & training'],
    color: 'rgba(245, 158, 11, 0.15)', // amber
  },
];

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-[120px] relative overflow-hidden bg-[#030712]">
      {/* Background radial glow */}
      <div className="absolute top-[30%] left-[-15%] w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Container class */}
      <div className="ds-container relative z-10">
        
        {/* Header Block */}
        <FadeUp>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-8 text-left">
            <div>
              <span className="text-highlight text-xs font-mono font-bold uppercase tracking-[0.18em]">Workflow</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">How We Work</h2>
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-sm leading-relaxed">
              Our step-by-step methodology ensures zero scope creep and complete alignment. We take you from a concept to a high-end deployment.
            </p>
          </div>
        </FadeUp>

        {/* Process layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline Steps List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;
              return (
                <FadeUp key={step.num} delay={idx * 0.05}>
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isSelected 
                        ? 'bg-white/5 border-white/15 shadow-[0_10px_30px_rgba(59,130,246,0.05)]' 
                        : 'bg-transparent border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono font-bold text-sm tracking-widest ${
                        isSelected ? 'text-[#3B82F6]' : 'text-gray-500 group-hover:text-gray-300'
                      }`}>
                        {step.num}
                      </span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        isSelected 
                          ? 'bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]' 
                          : 'bg-white/5 border-white/10 text-gray-400 group-hover:text-white'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className={`font-display font-semibold transition-colors ${
                          isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'
                        }`}>
                          {step.title}
                        </h4>
                        <p className="text-gray-500 text-[11px] mt-0.5">{step.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className={`text-gray-500 transition-all ${
                      isSelected ? 'translate-x-1 text-[#3B82F6]' : 'group-hover:translate-x-1 group-hover:text-white'
                    }`} />
                  </button>
                </FadeUp>
              );
            })}
          </div>

          {/* Right Column: Detailed Step Card */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="h-full"
              >
                <Card 
                  glowColor={STEPS[activeStep].color}
                  className="p-8 text-left h-full flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#3B82F6] uppercase tracking-widest">
                      PHASE {STEPS[activeStep].num}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-2 mb-3">
                      {STEPS[activeStep].title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {STEPS[activeStep].description}
                    </p>
                    
                    <h4 className="font-display font-semibold text-white mb-3 text-xs uppercase tracking-wider">
                      Key Deliverables
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {STEPS[activeStep].deliverables.map((del, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-gray-400">
                          <span className="w-4 h-4 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
                            <Check size={10} />
                          </span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-white/5 pt-6 mt-8 flex justify-between items-center text-xs text-gray-500">
                    <span>Target Speed Metric: &gt;95%</span>
                    <span>100% Quality Assurance</span>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Process;
