import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import { FadeUp } from '../components/ui/Reveal';

const FAQS = [
  {
    question: "Do you build custom websites or use predefined theme templates?",
    answer: "We build 100% bespoke digital solutions. We code our layouts, components, and animations from scratch in React, utilizing Tailwind CSS for custom style rules. We never utilize bloated themes or drag-and-drop website builders.",
  },
  {
    question: "How do you coordinate project scopes and estimations?",
    answer: "Every client engagement starts with a thorough blueprint stage where we document the wireframes, feature lists, and technical stack. This allows us to provide a fixed-scope pricing model with zero surprise costs.",
  },
  {
    question: "What is your average timeline for launching a custom application?",
    answer: "Single page boutique builds take 2 to 4 weeks. Multi-page Growth suites typically require 4 to 8 weeks, while complex database-connected Enterprise portals require 8 to 12 weeks of engineering.",
  },
  {
    question: "Do you hand over the source code ownership upon completion?",
    answer: "Yes, you own 100% of the repository. Upon final payment, we transfer the GitHub repository ownership, DNS configurations, and graphic assets directly to you, providing an documentation folder.",
  },
  {
    question: "What communication channels do you use during building stages?",
    answer: "We establish a dedicated private Slack or Discord channel for quick day-to-day messaging. Weekly design updates and progress reviews are scheduled via Zoom or Google Meet.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-[120px] relative overflow-hidden bg-[#111827]/10">
      {/* Background decorations */}
      <div className="absolute bottom-[5%] left-[-15%] w-96 h-96 bg-[#06b6d4]/5 blur-[120px] pointer-events-none" />

      {/* Container class */}
      <div className="ds-container relative z-10">
        
        {/* Section Header */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-highlight text-xs font-mono font-bold uppercase tracking-[0.18em]">Inquiries</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Got questions? We have direct answers. If your inquiry is not answered below, feel free to contact us directly.
            </p>
          </div>
        </FadeUp>

        {/* Accordions Container */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeUp key={idx} delay={idx * 0.05}>
                <Card
                  glowColor="rgba(59, 130, 246, 0.08)"
                  className="border-white/5 cursor-pointer text-left overflow-hidden transition-all duration-300"
                  onClick={() => toggleFAQ(idx)}
                >
                  <div className="p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <HelpCircle size={18} className={`${isOpen ? 'text-highlight' : 'text-gray-500'} shrink-0`} />
                      <h3 className="font-display font-semibold text-sm sm:text-base text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-500 hover:text-white"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>

                  {/* Expanding body content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/5 text-xs sm:text-sm text-gray-400 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
