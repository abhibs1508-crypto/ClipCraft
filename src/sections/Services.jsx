import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Smartphone, Megaphone, BookOpen, Presentation, X, Check, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FadeUp } from '../components/ui/Reveal';

const SERVICES = [
  {
    id: 'web-dev',
    icon: Code2,
    title: 'Web Application Development',
    subtitle: 'High-performance interactive web apps',
    description: 'We engineer state-of-the-art web architectures with React, Next.js, and Vite. Our emphasis is on lighting-fast paint speeds, pristine styling layouts, and pixel-perfect transitions.',
    details: {
      deliverables: [
        'Single Page Applications (SPAs) & SSR Portals',
        'Custom E-Commerce & Payment Gateway API pipelines',
        'Advanced Content Management Integrations (headless CMS)',
        'SEO Audits, speed optimization, and secure API gateways',
      ],
      tools: ['React.js', 'Next.js', 'Vite', 'Node.js', 'GraphQL', 'TailwindCSS'],
      timeline: '4 - 8 weeks average build time',
    },
    color: 'rgba(59, 130, 246, 0.15)', // blue glow
  },
  {
    id: 'mobile-dev',
    icon: Smartphone,
    title: 'Mobile Application Development',
    subtitle: 'Immersive native iOS & Android solutions',
    description: 'We construct beautiful native iOS and Android products using React Native and Flutter. We build intuitive responsive mobile flows, ensuring visual cohesion across all device screens.',
    details: {
      deliverables: [
        'Cross-platform iOS & Android apps (React Native/Flutter)',
        'Native device integrations (Biometrics, Camera, Geofencing)',
        'Offline capability support with lightweight local storage sync',
        'App Store & Google Play submission and asset generation',
      ],
      tools: ['React Native', 'Flutter', 'Redux', 'Swift', 'Kotlin', 'Firebase'],
      timeline: '6 - 12 weeks average build time',
    },
    color: 'rgba(124, 58, 237, 0.15)', // purple glow
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Digital Marketing & Growth',
    subtitle: 'Brand acceleration & conversion engineering',
    description: 'We build digital advertising funnels and SEO structures that target high-quality consumers. We focus on search engine optimization and programmatic advertising structures.',
    details: {
      deliverables: [
        'Search Engine Optimization (SEO) & keyword domination',
        'Social Media marketing & customized high-converting copy',
        'Advanced analytics tracking, pixel audits, and Heatmap studies',
        'Performance marketing campaigns & conversion rate optimization',
      ],
      tools: ['Google Analytics 4', 'Ahrefs', 'Meta Ads Manager', 'Semrush', 'Funnels'],
      timeline: 'Ongoing monthly performance optimization',
    },
    color: 'rgba(6, 182, 212, 0.15)', // cyan glow
  },
  {
    id: 'ebook',
    icon: BookOpen,
    title: 'Premium eBook Creation',
    subtitle: 'Editorial publishing & authority building',
    description: 'We transform complex knowledge bases into editorial digital assets. We coordinate graphic design, copywriting, and typography layout to establish your brand authority.',
    details: {
      deliverables: [
        'Copyediting, structural outlining, and proofreading',
        'Custom layout design, infographics, and covers',
        'PDF, EPUB, and Kindle formats distribution',
        'Lead magnet page setup & email funnel sequence integrations',
      ],
      tools: ['Adobe InDesign', 'Illustrator', 'Figma', 'Markua', 'Markdown'],
      timeline: '2 - 4 weeks average build time',
    },
    color: 'rgba(236, 72, 153, 0.15)', // pink glow
  },
  {
    id: 'presentation',
    icon: Presentation,
    title: 'Presentation Generation',
    subtitle: 'High-stakes investor pitch decks & assets',
    description: 'We structure pitch decks and company layouts that convince board members. We focus on content copywriting, visual pacing, and premium custom vector illustrations.',
    details: {
      deliverables: [
        'Pitch decks for venture-backed fundraising rounds',
        'Corporate reports, annual summaries, and proposal decks',
        'Interactive Figma slides & custom animations',
        'Speaker notes, scripting, and pitch presentation training',
      ],
      tools: ['Figma', 'Keynote', 'PowerPoint', 'Adobe Illustrator'],
      timeline: '1 - 3 weeks average build time',
    },
    color: 'rgba(245, 158, 11, 0.15)', // amber glow
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden'; // Lock scrolling
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = ''; // Unlock scrolling
  };

  const handleContactRedirect = () => {
    closeModal();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-[120px] relative overflow-hidden bg-[#111827]/30">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

      {/* Container class */}
      <div className="ds-container relative z-10">
        
        {/* Section Header */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-highlight text-xs font-mono font-bold uppercase tracking-[0.18em]">Capabilities</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">What We Do</h2>
            <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
              We provide full-spectrum digital engineering. We map out premium aesthetics, scalable frameworks, and conversion tactics to yield real results.
            </p>
          </div>
        </FadeUp>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeUp key={service.id} delay={index * 0.1}>
                <Card
                  glowColor={service.color}
                  className="p-8 h-full flex flex-col justify-between items-start text-left cursor-pointer group"
                  onClick={() => openModal(service)}
                >
                  <div>
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-[#3b82f6]/10 group-hover:border-[#3b82f6]/20 transition-all duration-300">
                      <Icon size={22} className="text-white group-hover:text-[#3b82f6] transition-colors" />
                    </div>
                    
                    <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-[#3b82f6] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-medium mb-4 tracking-wide uppercase">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <span className="text-highlight text-xs font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Learn More
                    <ArrowRight size={14} />
                  </span>
                </Card>
              </FadeUp>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#111827] border border-white/10 rounded-3xl w-full max-w-2xl relative overflow-hidden shadow-2xl p-8 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer z-20"
              >
                <X size={18} />
              </button>

              {/* Glowing backing inside modal */}
              <div 
                className="absolute top-[-100px] left-[-100px] w-64 h-64 rounded-full blur-[80px] pointer-events-none"
                style={{ backgroundColor: selectedService.color }}
              />

              {/* Service info header */}
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  {React.createElement(selectedService.icon, { size: 26 })}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-white leading-tight">
                    {selectedService.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-0.5">{selectedService.subtitle}</p>
                </div>
              </div>

              {/* Body Description */}
              <p className="relative z-10 text-gray-300 text-sm leading-relaxed mb-8 border-b border-white/5 pb-6">
                {selectedService.description}
              </p>

              {/* Deliverables List */}
              <div className="relative z-10 mb-8">
                <h4 className="font-display font-semibold text-white mb-4 text-base uppercase tracking-wider">
                  Deliverables Include
                </h4>
                <ul className="flex flex-col gap-3">
                  {selectedService.details.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                      <span className="w-5 h-5 rounded-md bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6] shrink-0 mt-0.5">
                        <Check size={12} />
                      </span>
                      <span className="leading-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Technologies & Timeline Footer */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/5 border border-white/5 rounded-2xl p-5 mb-8">
                <div>
                  <h5 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Stack / Tools</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedService.details.tools.map((tech) => (
                      <span key={tech} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Timeline</h5>
                  <p className="text-sm font-semibold text-white">{selectedService.details.timeline}</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="relative z-10 flex flex-wrap gap-4">
                <Button variant="primary" onClick={handleContactRedirect} className="w-full sm:w-auto justify-center">
                  Start Your Build
                  <ArrowRight size={16} />
                </Button>
                <Button variant="secondary" onClick={closeModal} className="w-full sm:w-auto justify-center">
                  Close Details
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
