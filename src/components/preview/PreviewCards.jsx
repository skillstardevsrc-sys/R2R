import React from 'react';
import { Layers, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

export default function PreviewCards({
  cardStyle = 'border',
  borderRadius = 20,
  accentColor = '#D4AF37',
  headingFont = 'Manrope',
  bodyFont = 'Inter'
}) {
  const getCardStyleClass = () => {
    switch (cardStyle) {
      case 'glass':
        return 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-glass';
      case 'flat':
        return 'bg-surface border-0';
      case 'shadow':
        return 'bg-surface border border-white/5 shadow-2xl';
      case 'floating':
        return 'bg-surface-hover border border-white/15 shadow-card hover:-translate-y-1';
      case 'three-d':
        return 'bg-surface border-t border-white/20 border-b-2 border-black shadow-xl';
      case 'no-cards':
        return 'bg-transparent border-b border-white/10 rounded-none p-0 pb-6';
      default: // border
        return 'bg-surface/70 border border-white/10 hover:border-white/25';
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'High-Velocity Performance',
      desc: 'Sub-millisecond asset rendering with automated CDN pipeline delivery.'
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security',
      desc: 'Zero-trust architecture with end-to-end cryptographic integrity.'
    },
    {
      icon: Layers,
      title: 'Modular Design Tokens',
      desc: 'Effortlessly synchronized design tokens scaling from mobile to ultra-wide.'
    }
  ];

  return (
    <section className="py-10 px-6 max-w-5xl mx-auto border-t border-white/5">
      <div className="flex flex-col items-start gap-2 mb-8">
        <span className="text-[11px] font-mono tracking-wider uppercase text-accent font-semibold">
          Core Capabilities
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: headingFont }}>
          Engineered for decisive impact.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <div
              key={index}
              className={`p-5 transition-all duration-200 flex flex-col justify-between group ${getCardStyleClass()}`}
              style={{ borderRadius: cardStyle === 'no-cards' ? '0px' : `${borderRadius}px` }}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5" style={{ fontFamily: headingFont }}>
                  {feat.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed" style={{ fontFamily: bodyFont }}>
                  {feat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1 text-[11px] font-medium text-white/80 group-hover:text-accent transition-colors">
                <span>Learn more</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
