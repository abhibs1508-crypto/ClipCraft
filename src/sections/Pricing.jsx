import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, HelpCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FadeUp } from '../components/ui/Reveal';

const PLANS = [
  {
    name: 'Starter Build',
    desc: 'Boutique single landing experiences',
    priceMonthly: 1200,
    priceYearly: 960,
    features: [
      'Single Landing Page (Framer Motion focus)',
      'Custom SVG graphics and illustrations',
      'Mobile/Tablet responsive layouts',
      'Integration with contact form & analytics',
      'Deploy to superfast Vercel/Netlify CDNs',
      '1 week post-launch basic support',
    ],
    cta: 'Inquire Starter',
    popular: false,
    color: 'rgba(59, 130, 246, 0.15)', // blue
  },
  {
    name: 'Growth Suite',
    desc: 'Full-stack application environments',
    priceMonthly: 3500,
    priceYearly: 2800,
    features: [
      'Up to 6 unique template pages',
      'Intersection active navbar indicators',
      'Custom animations / micro-interactions',
      'Headless CMS content integrations',
      'Complete speed audits (>95% score)',
      'Advanced contact forms & custom popups',
      '4 weeks post-launch warranty support',
    ],
    cta: 'Inquire Growth',
    popular: true,
    color: 'rgba(124, 58, 237, 0.2)', // purple
  },
  {
    name: 'Enterprise Scale',
    desc: 'Complex customized platform systems',
    priceMonthly: 7200,
    priceYearly: 5760,
    features: [
      'Unlimited responsive pages',
      'Rust WebAssembly & WebGL chart canvas',
      'Complete design system export in Figma',
      'State synchronizations (WebSockets/Redux)',
      'Database / Auth backend API integrations',
      '24/7 dedicated Slack group support channel',
      'Lifetime source-code warranty support',
    ],
    cta: 'Inquire Enterprise',
    popular: false,
    color: 'rgba(6, 182, 212, 0.15)', // cyan
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

  const handleInquire = (planName) => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const msgField = document.getElementById('contact-message');
      if (msgField) {
        msgField.value = `Hi Aetheria, I would like to inquire about the "${planName}" package (${billingCycle} billing).`;
        msgField.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  return (
    <section id="pricing" className="py-[120px] relative overflow-hidden bg-[#111827]/10 border-t border-b border-white/5">
      {/* Glow background */}
      <div className="absolute top-[20%] right-[-15%] w-96 h-96 bg-[#8b5cf6]/5 blur-[120px] pointer-events-none" />

      {/* Container class */}
      <div className="ds-container relative z-10">
        
        {/* Section Header */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-highlight text-xs font-mono font-bold uppercase tracking-[0.18em]">Pricing Packages</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-white">Transparent Billing</h2>
            <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
              Choose a roadmap that aligns with your timeline. We believe in clear, fixed-scope estimations with zero surprise bills.
            </p>
          </div>
        </FadeUp>

        {/* Toggle Switch */}
        <FadeUp delay={0.1}>
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-8 rounded-full bg-white/5 border border-white/10 p-1 flex items-center transition-all cursor-pointer relative"
              aria-label="Billing cycle toggle"
            >
              <motion.div
                layout
                className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary"
                animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>

            <span className={`text-sm flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
              Yearly 
              <span className="text-[10px] bg-highlight/15 text-highlight border border-highlight/20 px-2 py-0.5 rounded-full font-semibold uppercase">
                Save 20%
              </span>
            </span>
          </div>
        </FadeUp>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan, index) => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
            return (
              <FadeUp key={plan.name} delay={index * 0.1}>
                <div className={plan.popular ? 'lg:-translate-y-4 relative z-20' : 'relative z-10'}>
                  <Card
                    glowColor={plan.color}
                    className={`p-8 text-left flex flex-col justify-between ${
                      plan.popular ? 'border-[#3B82F6]/40 shadow-[0_20px_50px_rgba(59,130,246,0.15)] bg-white/[0.06]' : 'border-white/5'
                    }`}
                  >
                    {/* Popular tag */}
                    {plan.popular && (
                      <span className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                        Highly Recommended
                      </span>
                    )}

                    <div>
                      <h3 className="font-display font-extrabold text-2xl text-white mb-1">{plan.name}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-6">{plan.desc}</p>
                      
                      {/* Price strip */}
                      <div className="flex items-baseline gap-1.5 border-b border-white/5 pb-6 mb-6">
                        <span className="font-display text-4xl sm:text-5xl font-extrabold text-white">
                          ${price}
                        </span>
                        <span className="text-gray-400 text-sm">/ project</span>
                      </div>

                      {/* Features checklist */}
                      <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">Included deliverables</h4>
                      <ul className="flex flex-col gap-3.5 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs text-gray-300">
                            <span className="w-5 h-5 rounded-md bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5 animate-pulse-slow">
                              <Check size={10} />
                            </span>
                            <span className="leading-normal">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={plan.popular ? 'primary' : 'secondary'}
                      onClick={() => handleInquire(plan.name)}
                      className="w-full justify-center"
                    >
                      {plan.cta}
                    </Button>
                  </Card>
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
