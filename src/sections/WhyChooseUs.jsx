import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, MessageSquareCode, ShieldAlert } from 'lucide-react';
import Card from '../components/ui/Card';
import { FadeUp } from '../components/ui/Reveal';

const REASONS = [
  {
    icon: Target,
    title: 'Precision Focus',
    description: 'We align design choices directly with your business goals. Every asset and animation serves to qualify leads or increase engagement.',
    color: 'rgba(59, 130, 246, 0.15)', // blue
  },
  {
    icon: Cpu,
    title: 'Modern Architecture',
    description: 'No bloated web plugins or drag-and-drop page builders. We code React apps from scratch to ensure speed and code maintainability.',
    color: 'rgba(124, 58, 237, 0.15)', // purple
  },
  {
    icon: MessageSquareCode,
    title: 'Direct Access',
    description: 'You communicate directly with our engineers and designers. No account manager layers or delayed response schedules.',
    color: 'rgba(6, 182, 212, 0.15)', // cyan
  },
  {
    icon: ShieldAlert,
    title: 'Production Reliability',
    description: 'We audit accessibility structures, verify browser responsiveness, and stress-test loading performance prior to launch.',
    color: 'rgba(34, 197, 94, 0.15)', // green
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-[120px] relative overflow-hidden bg-[#111827]/10">
      {/* Background decorations */}
      <div className="absolute bottom-[10%] right-[-15%] w-80 h-80 rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      {/* Container class */}
      <div className="ds-container relative z-10">
        
        {/* Header Block */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-highlight text-xs font-mono font-bold uppercase tracking-[0.18em]">Our Value</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">Why Partner With Us?</h2>
            <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
              We work with teams who treat their digital presence as an asset, not a checklist item. We build digital platforms that work.
            </p>
          </div>
        </FadeUp>

        {/* Reason Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REASONS.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <FadeUp key={reason.title} delay={idx * 0.1}>
                <Card 
                  glowColor={reason.color}
                  className="p-8 h-full flex items-start gap-6 text-left"
                >
                  {/* Icon Wrapper */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                    <Icon size={22} className="text-white" />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">{reason.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{reason.description}</p>
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

export default WhyChooseUs;
