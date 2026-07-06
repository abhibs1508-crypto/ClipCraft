import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Terminal, Sparkles, X, Check, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FadeUp } from '../components/ui/Reveal';

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Applications' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'design', label: 'Creative Design' },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Aether Nexus Portal',
    category: 'web',
    tag: 'Web App',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3B82F6 50%, #06B6D4 100%)',
    desc: 'An AI-integrated workspace dashboard featuring real-time collaborative state syncing and custom canvas node charts.',
    client: 'Nexus Technologies Corp',
    duration: '8 weeks',
    tech: ['React.js', 'Framer Motion', 'TailwindCSS', 'WebSocket', 'CanvasAPI'],
    challenge: 'Architecting dynamic node graph layouts that render 1000+ data nodes at 60fps without choking React virtual DOM.',
    solution: 'Designed an HTML5 Canvas drawing scheduler integrated with React state hooks, enabling fluid zooms and mouse drag pan.',
  },
  {
    id: 2,
    title: 'Solaria Crypto Vault',
    category: 'mobile',
    tag: 'Mobile App',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7C3AED 50%, #ec4899 100%)',
    desc: 'Next-generation biometric-secured cryptocurrency cold wallet app built for seamless cross-chain assets swapping.',
    client: 'Solaria Labs Inc',
    duration: '10 weeks',
    tech: ['React Native', 'Ethers.js', 'FaceID SDK', 'Node.js', 'Redux Toolkit'],
    challenge: 'Ensuring military-grade security encryption standards during cross-chain trades without adding latency.',
    solution: 'Implemented hardware keychain storage keys coupled with multi-threaded offline verification scripts.',
  },
  {
    id: 3,
    title: 'Aura Premium Branding',
    category: 'design',
    tag: 'Creative Design',
    gradient: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)',
    desc: 'Full editorial design suite, custom typography, brand style guidelines, and interactive vector pitch presentation decks.',
    client: 'Aura Luxury Apparel',
    duration: '4 weeks',
    tech: ['Figma', 'Adobe Illustrator', '3D Blender Layout', 'Vector Graphics'],
    challenge: 'Structuring a unified design visual identity matching both digital web assets and physical luxury print labels.',
    solution: 'Created an adaptive scalable vector grid system that maintains grid balance regardless of responsive media sizes.',
  },
  {
    id: 4,
    title: 'Vortex Analytical Engine',
    category: 'web',
    tag: 'Web App',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #311042 100%)',
    desc: 'An enterprise statistics platform featuring dynamic pipeline builders, WebGL charts, and customizable query filters.',
    client: 'Vortex Statistics Inc',
    duration: '12 weeks',
    tech: ['Next.js', 'WebGL', 'D3.js', 'Rust WebAssembly', 'PostgreSQL'],
    challenge: 'Processing million-row CSV datasets in the browser and updating charting dashboards instantly.',
    solution: 'Delegated mathematical computation pipelines to Rust-compiled WebAssembly scripts running in background Web Workers.',
  },
  {
    id: 5,
    title: 'Zenith Fitness Companion',
    category: 'mobile',
    tag: 'Mobile App',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 55%, #34d399 100%)',
    desc: 'A gorgeous micro-animated fitness utility that records exercises, tracks heart rate logs, and builds routines.',
    client: 'Zenith Labs',
    duration: '6 weeks',
    tech: ['React Native', 'Apple HealthKit', 'Bluetooth Core', 'SQLite'],
    challenge: 'Synchronizing real-time bluetooth smart ring measurements concurrently with high battery efficiency.',
    solution: 'Created a background listener scheduler that caches measurements and queues batch uploads every 10 minutes.',
  },
  {
    id: 6,
    title: 'Nova Editorial eBooks',
    category: 'design',
    tag: 'Creative Design',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #f59e0b 100%)',
    desc: 'Curated compilation of digital design manuals featuring custom vector diagrams and responsive CSS layout readers.',
    client: 'Nova Design Co',
    duration: '3 weeks',
    tech: ['Adobe InDesign', 'CSS Layouts', 'Figma Design System', 'Epub Builder'],
    challenge: 'Translating heavy data tables and code fragments into clean, comfortable layouts for all tablet devices.',
    solution: 'Engineered an adaptive HTML reader style system using CSS variables that rescales sizing parameters dynamically.',
  },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeFilter);

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="portfolio" className="py-[120px] relative overflow-hidden">
      {/* Container class */}
      <div className="ds-container relative z-10">
        
        {/* Section Header */}
        <FadeUp>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-8 text-left">
            <div>
              <span className="text-highlight text-xs font-mono font-bold uppercase tracking-[0.18em]">Case Studies</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">Selected Works</h2>
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-sm leading-relaxed">
              Take a look at our production builds. Each project represents a technical challenge resolved with custom solutions.
            </p>
          </div>
        </FadeUp>

        {/* Filter Controls */}
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 mb-10 bg-white/5 border border-white/5 p-1.5 rounded-2xl w-fit">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  activeFilter === cat.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{cat.label}</span>
                {activeFilter === cat.id && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Card
                  onClick={() => openProjectModal(project)}
                  className="h-full flex flex-col justify-between overflow-hidden group cursor-pointer border-white/5"
                >
                  {/* Visual gradient backdrop */}
                  <div 
                    className="w-full aspect-[16/10] relative flex items-center justify-center p-6 transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ background: project.gradient }}
                  >
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                    
                    {/* Floating mockup frame */}
                    <div className="w-[80%] h-[75%] bg-black/45 backdrop-blur-md rounded-xl border border-white/10 p-4 flex flex-col justify-between shadow-2xl relative">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-400">
                        <Terminal size={10} className="text-highlight" />
                        <span>build_status: active</span>
                      </div>
                      <div className="flex flex-col gap-1.5 my-3">
                        <span className="text-xs font-semibold text-white tracking-wide uppercase">{project.title}</span>
                        <div className="flex gap-1">
                          {project.tech.slice(0, 3).map(t => (
                            <span key={t} className="text-[8px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-300">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-highlight w-[70%]" />
                      </div>
                    </div>
                  </div>

                  {/* Info Panel */}
                  <div className="p-6 text-left flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-highlight text-[10px] font-semibold uppercase tracking-widest block mb-1">
                        {project.tag}
                      </span>
                      <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#3b82f6] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                        {project.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                      <span className="text-[10px] font-mono text-gray-500 uppercase">CLIENT: {project.client}</span>
                      <span className="text-white text-xs font-semibold flex items-center gap-1 group-hover:text-highlight transition-colors">
                        View Study
                        <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectModal}
              className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#111827] border border-white/10 rounded-3xl w-full max-w-3xl relative overflow-hidden shadow-2xl p-8 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={closeProjectModal}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer z-20"
              >
                <X size={18} />
              </button>

              {/* Color Header Banner */}
              <div 
                className="w-full aspect-[21/9] rounded-2xl relative flex items-center justify-center p-6 overflow-hidden mb-6"
                style={{ background: selectedProject.gradient }}
              >
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white drop-shadow-lg z-10">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Metadata strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 border border-white/5 rounded-2xl p-4 mb-6 text-left">
                <div>
                  <h5 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Client</h5>
                  <p className="text-sm font-semibold text-white">{selectedProject.client}</p>
                </div>
                <div>
                  <h5 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Category</h5>
                  <p className="text-sm font-semibold text-white">{selectedProject.tag}</p>
                </div>
                <div>
                  <h5 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Duration</h5>
                  <p className="text-sm font-semibold text-white">{selectedProject.duration}</p>
                </div>
                <div>
                  <h5 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Tech Stack</h5>
                  <p className="text-sm font-semibold text-accent">{selectedProject.tech[0]} & More</p>
                </div>
              </div>

              {/* Scope details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-6">
                <div>
                  <h4 className="font-display font-semibold text-white mb-2 text-sm uppercase tracking-wider">The Challenge</h4>
                  <p className="text-sm text-gray-400 leading-relaxed bg-white/5 border border-white/5 p-4 rounded-xl">
                    {selectedProject.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-white mb-2 text-sm uppercase tracking-wider">The Solution</h4>
                  <p className="text-sm text-gray-400 leading-relaxed bg-[#3B82F6]/5 border border-[#3B82F6]/10 p-4 rounded-xl">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Tech details */}
              <div className="text-left mb-8">
                <h4 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider">Technologies Leveraged</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="text-xs bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" onClick={closeProjectModal} className="w-full sm:w-auto justify-center">
                  Close Case Study
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    closeProjectModal();
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto justify-center"
                >
                  Inquire For Similar Build
                  <ArrowRight size={15} />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
