import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function PreviewCTA({
  brandName = 'Acme Inc',
  accentColor = '#D4AF37',
  borderRadius = 20,
  headingFont = 'Manrope',
  buttonStyle = 'rounded'
}) {
  const brand = brandName || 'Acme Inc';

  const getButtonClass = () => {
    let radius = `${borderRadius}px`;
    if (buttonStyle === 'pill') radius = '9999px';
    if (buttonStyle === 'square') radius = '0px';

    if (buttonStyle === 'outline') {
      return {
        className: 'px-6 py-3 text-xs font-semibold border transition-all flex items-center justify-center gap-2',
        style: { borderColor: accentColor, color: accentColor, borderRadius: radius }
      };
    }
    if (buttonStyle === 'glass') {
      return {
        className: 'px-6 py-3 text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-glass transition-all flex items-center justify-center gap-2',
        style: { borderRadius: radius }
      };
    }
    if (buttonStyle === 'gradient') {
      return {
        className: 'px-6 py-3 text-xs font-bold text-black shadow-lg transition-all flex items-center justify-center gap-2',
        style: {
          background: `linear-gradient(135deg, ${accentColor}, #FFEAA7)`,
          borderRadius: radius
        }
      };
    }

    return {
      className: 'px-6 py-3 text-xs font-bold text-black transition-all shadow-md flex items-center justify-center gap-2',
      style: { backgroundColor: accentColor, borderRadius: radius }
    };
  };

  const btn = getButtonClass();

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div
        className="relative overflow-hidden p-8 sm:p-10 border border-white/15 bg-gradient-to-b from-surface-hover to-surface flex flex-col items-center text-center gap-4 shadow-2xl"
        style={{ borderRadius: `${Math.max(16, borderRadius)}px` }}
      >
        <div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white">
          <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
          <span>Transform Your Experience</span>
        </div>

        <h2
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight max-w-xl"
          style={{ fontFamily: headingFont }}
        >
          Ready to scale with {brand}?
        </h2>

        <p className="text-xs sm:text-sm text-text-muted max-w-md">
          Join leading industry innovators who trust our bespoke digital solutions.
        </p>

        <div className="pt-2">
          <button {...btn}>
            <span>Request Proposal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
