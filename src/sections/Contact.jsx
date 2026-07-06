import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, User, Globe, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FadeUp } from '../components/ui/Reveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'web-dev',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Please provide your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email syntax.';
    }
    if (!formData.message.trim()) tempErrors.message = 'Please input your message.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: 'web-dev', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-[120px] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-[#8b5cf6]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#3b82f6]/5 blur-[130px] pointer-events-none" />

      {/* Container class */}
      <div className="ds-container relative z-10">
        
        {/* Section Header */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-highlight text-xs font-mono font-bold uppercase tracking-[0.18em]">Connect</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">Start a Collaboration</h2>
            <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
              Ready to design a premium digital experience? Reach out and we will respond within 24 hours.
            </p>
          </div>
        </FadeUp>

        {/* Contact layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <FadeUp delay={0.1}>
              <Card glowColor="rgba(59, 130, 246, 0.12)" className="p-8 border-white/5 bg-white/[0.02]">
                <h3 className="font-display font-extrabold text-xl text-white mb-6">Studio Directory</h3>
                
                <div className="flex flex-col gap-6">
                  {/* Email item */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#3B82F6] shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">Email Us</span>
                      <a href="mailto:hello@aetheria.agency" className="text-sm font-semibold text-white hover:text-[#3B82F6] transition-colors mt-0.5 block">
                        hello@aetheria.agency
                      </a>
                    </div>
                  </div>

                  {/* Phone item */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#7C3AED] shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">Call Us</span>
                      <a href="tel:+15559873432" className="text-sm font-semibold text-white hover:text-[#7C3AED] transition-colors mt-0.5 block">
                        +1 (555) 987-3432
                      </a>
                    </div>
                  </div>

                  {/* Location item */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#06B6D4] shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">Studio Location</span>
                      <p className="text-sm font-semibold text-white mt-0.5 leading-normal">
                        One World Trade, Suite 104<br />New York, NY 10007
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mock map graphic */}
                <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="w-full aspect-[21/9] rounded-xl bg-gradient-to-br from-[#1e1b4b] to-[#030712] border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
                    <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-accent/25 blur-sm animate-ping" />
                    <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-[#06B6D4] border border-white shadow-lg" />
                    <span className="text-[10px] font-mono text-gray-500 z-10">NYC OFFICE MAP ROUTER</span>
                    <span className="text-[9px] font-semibold text-highlight z-10 self-end flex items-center gap-1">ACTIVE NODE <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" /></span>
                  </div>
                </div>
              </Card>
            </FadeUp>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.2}>
              <Card glowColor="rgba(124, 58, 237, 0.12)" className="p-8 border-white/5">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6 text-left"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name input */}
                        <div className="flex flex-col gap-2 relative">
                          <label htmlFor="name" className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                            <User size={13} /> Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Jane Doe"
                            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                              errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#3B82F6]/50'
                            }`}
                          />
                          {errors.name && <span className="text-[10px] text-red-500 mt-1">{errors.name}</span>}
                        </div>

                        {/* Email input */}
                        <div className="flex flex-col gap-2 relative">
                          <label htmlFor="email" className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                            <Mail size={13} /> Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jane@company.com"
                            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                              errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#3B82F6]/50'
                            }`}
                          />
                          {errors.email && <span className="text-[10px] text-red-500 mt-1">{errors.email}</span>}
                        </div>
                      </div>

                      {/* Subject dropdown */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="subject" className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                          <Globe size={13} /> Project Category
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]/50 transition-all"
                        >
                          <option value="web-dev">Web Application Development</option>
                          <option value="mobile-dev">Mobile Application Development</option>
                          <option value="marketing">Digital Marketing / Growth</option>
                          <option value="ebook">eBook Production</option>
                          <option value="presentation">Presentation Pitch Deck</option>
                        </select>
                      </div>

                      {/* Message textarea */}
                      <div className="flex flex-col gap-2 relative">
                        <label htmlFor="contact-message" className="text-xs font-semibold text-gray-400">
                          Project Description / Details
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell us about your brand, requirements, and target timeline..."
                          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                            errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#3B82F6]/50'
                          }`}
                        />
                        {errors.message && <span className="text-[10px] text-red-500 mt-1">{errors.message}</span>}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        className="w-full justify-center !py-3.5 mt-2"
                      >
                        {isSubmitting ? (
                          <span>Initiating Secure Sync...</span>
                        ) : (
                          <>
                            Send Message
                            <Send size={15} />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <CheckCircle2 size={56} className="text-accent mb-4 animate-bounce" />
                      <h3 className="font-display font-extrabold text-2xl text-white mb-2">Sync Completed</h3>
                      <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-6">
                        Your client inquiry has been secure-synced into our directory. A lead designer will reach out shortly.
                      </p>
                      <Button variant="secondary" onClick={() => setIsSuccess(false)}>
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </FadeUp>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
