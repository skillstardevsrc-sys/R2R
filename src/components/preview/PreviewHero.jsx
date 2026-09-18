import React from 'react';
import { ArrowRight, Play, Sparkles, CheckCircle2, Shield, Zap } from 'lucide-react';

export default function PreviewHero({
  brandName = 'Acme Inc',
  heroStyle = 'split',
  accentColor = '#D4AF37',
  borderRadius = 20,
  headingFont = 'Manrope',
  bodyFont = 'Inter',
  buttonStyle = 'rounded',
  imageShape = 'rounded',
  imageStyle = 'real-photo'
}) {
  const brand = brandName || 'Acme Inc';

  const getButtonClass = (isSecondary = false) => {
    let radius = `${borderRadius}px`;
    if (buttonStyle === 'pill') radius = '9999px';
    if (buttonStyle === 'square') radius = '0px';

    if (isSecondary) {
      return {
        className: 'px-4 py-2.5 text-xs font-medium border border-white/20 hover:border-white/40 text-white bg-white/5 transition-all flex items-center justify-center gap-2',
        style: { borderRadius: radius }
      };
    }

    if (buttonStyle === 'outline') {
      return {
        className: 'px-5 py-2.5 text-xs font-semibold border transition-all flex items-center justify-center gap-2',
        style: { borderColor: accentColor, color: accentColor, borderRadius: radius }
      };
    }

    if (buttonStyle === 'glass') {
      return {
        className: 'px-5 py-2.5 text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-glass transition-all flex items-center justify-center gap-2',
        style: { borderRadius: radius }
      };
    }

    if (buttonStyle === 'gradient') {
      return {
        className: 'px-5 py-2.5 text-xs font-bold text-black shadow-lg transition-all flex items-center justify-center gap-2',
        style: {
          background: `linear-gradient(135deg, ${accentColor}, #FFEAA7)`,
          borderRadius: radius
        }
      };
    }

    return {
      className: 'px-5 py-2.5 text-xs font-bold text-black transition-all shadow-md flex items-center justify-center gap-2',
      style: { backgroundColor: accentColor, borderRadius: radius }
    };
  };

  const getImageShapeStyle = () => {
    switch (imageShape) {
      case 'circle': return { borderRadius: '9999px', aspectRatio: '1/1' };
      case 'rectangle': return { borderRadius: '0px' };
      case 'blob': return { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' };
      case 'asymmetric': return { borderRadius: '32px 4px 32px 4px' };
      default: return { borderRadius: `${Math.max(12, borderRadius)}px` };
    }
  };

  const primaryBtn = getButtonClass(false);
  const secondaryBtn = getButtonClass(true);

  // Layout 1: Split Hero
  if (heroStyle === 'split') {
    return (
      <section className="py-12 sm:py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="md:col-span-7 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/90">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <span>Next-Gen Platform for {brand}</span>
            </div>

            <h1
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.15]"
              style={{ fontFamily: headingFont }}
            >
              Architecting the next era of digital excellence.
            </h1>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed" style={{ fontFamily: bodyFont }}>
              Engineered with uncompromising precision. We merge bespoke aesthetic direction with seamless interactive architecture.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button {...primaryBtn}>
                <span>Explore Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button {...secondaryBtn}>
                <Play className="w-3 h-3" />
                <span>Watch Story</span>
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="md:col-span-5 relative">
            <div
              className="w-full aspect-[4/3] bg-gradient-to-tr from-surface-hover to-surface border border-white/10 p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between"
              style={getImageShapeStyle()}
            >
              <div className="absolute inset-0 bg-dot-pattern opacity-40" />
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-30"
                style={{ backgroundColor: accentColor }}
              />

              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono text-white/60">SYSTEM // V2.4</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="z-10 bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10">
                <div className="text-[11px] font-semibold text-white">Live Intelligence</div>
                <div className="text-[10px] text-text-muted mt-0.5">Real-time telemetry & design precision</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Layout 2: Center Hero
  if (heroStyle === 'center') {
    return (
      <section className="py-14 sm:py-20 px-6 max-w-4xl mx-auto text-center flex flex-col items-center gap-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/90">
          <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span>Introducing the new standard</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-2xl"
          style={{ fontFamily: headingFont }}
        >
          Design that commands authority and action.
        </h1>

        <p className="text-xs sm:text-sm text-text-muted max-w-lg leading-relaxed" style={{ fontFamily: bodyFont }}>
          Empower your brand with purpose-built digital craftsmanship that sets you apart from legacy noise.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button {...primaryBtn}>
            <span>Start Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button {...secondaryBtn}>
            <span>Schedule Walkthrough</span>
          </button>
        </div>
      </section>
    );
  }

  // Layout 3: Fullscreen / Video / 3D / Editorial / Minimal
  return (
    <section className="py-12 sm:py-16 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-start gap-4 max-w-2xl">
        <div
          className="text-xs font-mono tracking-widest uppercase font-semibold"
          style={{ color: accentColor }}
        >
          {heroStyle.toUpperCase()} ARCHITECTURE
        </div>

        <h1
          className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
          style={{ fontFamily: headingFont }}
        >
          {brand} — Crafting memorable digital impressions.
        </h1>

        <p className="text-xs sm:text-sm text-text-muted leading-relaxed" style={{ fontFamily: bodyFont }}>
          Elevating digital interactions through bespoke layouts, disciplined whitespace, and balanced visual typography.
        </p>

        <div className="flex items-center gap-3 pt-3">
          <button {...primaryBtn}>
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button {...secondaryBtn}>
            <span>View Work</span>
          </button>
        </div>
      </div>
    </section>
  );
}
