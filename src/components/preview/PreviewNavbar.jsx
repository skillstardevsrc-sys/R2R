import React from 'react';
import { Menu, Sparkles, ArrowUpRight, Search } from 'lucide-react';

export default function PreviewNavbar({
  brandName = 'Acme Inc',
  navStyle = 'floating',
  accentColor = '#D4AF37',
  borderRadius = 20,
  headingFont = 'Manrope',
  buttonStyle = 'rounded'
}) {
  const brand = brandName || 'Acme Inc';

  const getButtonClass = () => {
    switch (buttonStyle) {
      case 'pill': return 'rounded-full';
      case 'square': return 'rounded-none';
      case 'outline': return 'border border-current bg-transparent text-white';
      case 'glass': return 'bg-white/10 backdrop-blur-md border border-white/20 text-white';
      case 'gradient': return 'bg-gradient-to-r from-amber-400 to-amber-200 text-black font-semibold';
      case 'minimal': return 'bg-white/5 hover:bg-white/10 text-white';
      default: return 'rounded-lg';
    }
  };

  // Nav layout styles
  if (navStyle === 'floating') {
    return (
      <div className="w-full pt-4 px-4 sticky top-0 z-20">
        <div
          className="max-w-4xl mx-auto px-5 py-2.5 bg-surface/85 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-2xl transition-all"
          style={{ borderRadius: `${Math.max(8, borderRadius)}px` }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-black font-bold text-xs"
              style={{ backgroundColor: accentColor }}
            >
              {brand.charAt(0)}
            </div>
            <span className="font-bold text-sm tracking-tight text-white" style={{ fontFamily: headingFont }}>
              {brand}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-xs text-white/70">
            <span className="hover:text-white cursor-pointer transition-colors">Overview</span>
            <span className="hover:text-white cursor-pointer transition-colors">Solutions</span>
            <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
            <span className="hover:text-white cursor-pointer transition-colors">Enterprise</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className={`text-xs px-3.5 py-1.5 font-medium transition-all ${getButtonClass()}`}
              style={{
                backgroundColor: buttonStyle !== 'outline' && buttonStyle !== 'glass' ? accentColor : undefined,
                color: buttonStyle === 'outline' || buttonStyle === 'glass' ? 'white' : '#000000',
                borderRadius: `${borderRadius}px`
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (navStyle === 'center-logo') {
    return (
      <nav className="w-full border-b border-white/10 px-6 py-3 bg-surface/70 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto grid grid-cols-3 items-center">
          <div className="flex items-center gap-4 text-xs text-white/70">
            <span className="hover:text-white cursor-pointer">Products</span>
            <span className="hover:text-white cursor-pointer">About</span>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div
              className="w-5 h-5 rounded-sm flex items-center justify-center text-black font-bold text-[10px]"
              style={{ backgroundColor: accentColor }}
            >
              {brand.charAt(0)}
            </div>
            <span className="font-bold text-sm tracking-tight text-white" style={{ fontFamily: headingFont }}>
              {brand}
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 text-xs">
            <span className="text-white/70 hover:text-white cursor-pointer hidden sm:inline">Contact</span>
            <button
              className={`text-xs px-3 py-1 font-medium ${getButtonClass()}`}
              style={{
                backgroundColor: buttonStyle !== 'outline' && buttonStyle !== 'glass' ? accentColor : undefined,
                color: buttonStyle === 'outline' || buttonStyle === 'glass' ? 'white' : '#000000',
                borderRadius: `${borderRadius}px`
              }}
            >
              Client Portal
            </button>
          </div>
        </div>
      </nav>
    );
  }

  if (navStyle === 'minimal' || navStyle === 'minimal-menu') {
    return (
      <nav className="w-full px-6 py-4 flex items-center justify-between sticky top-0 z-20 bg-bg/60 backdrop-blur-sm">
        <span className="font-bold text-sm tracking-tight text-white" style={{ fontFamily: headingFont }}>
          {brand}
        </span>
        <div className="flex items-center gap-4">
          <button className="text-xs text-white/70 hover:text-white">Index</button>
          <button className="p-1.5 text-white/80 hover:text-white rounded-md bg-white/5">
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </nav>
    );
  }

  if (navStyle === 'fullscreen' || navStyle === 'fullscreen-menu') {
    return (
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-white/5 sticky top-0 z-20 bg-bg/80 backdrop-blur-md">
        <span className="font-bold text-sm tracking-tight text-white" style={{ fontFamily: headingFont }}>
          {brand}
        </span>
        <button className="flex items-center gap-2 text-xs text-text-muted hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
          <span>MENU</span>
          <Menu className="w-3.5 h-3.5" />
        </button>
      </nav>
    );
  }

  // Classic & Glass default
  return (
    <nav className="w-full px-6 py-3.5 border-b border-white/10 bg-surface/80 backdrop-blur-lg sticky top-0 z-20 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-black font-bold text-xs"
          style={{ backgroundColor: accentColor }}
        >
          {brand.charAt(0)}
        </div>
        <span className="font-bold text-sm tracking-tight text-white" style={{ fontFamily: headingFont }}>
          {brand}
        </span>
      </div>

      <div className="hidden md:flex items-center gap-6 text-xs text-white/70">
        <span className="hover:text-white cursor-pointer">Platform</span>
        <span className="hover:text-white cursor-pointer">Solutions</span>
        <span className="hover:text-white cursor-pointer">Resources</span>
        <span className="hover:text-white cursor-pointer">Pricing</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          className={`text-xs px-4 py-2 font-medium transition-all ${getButtonClass()}`}
          style={{
            backgroundColor: buttonStyle !== 'outline' && buttonStyle !== 'glass' ? accentColor : undefined,
            color: buttonStyle === 'outline' || buttonStyle === 'glass' ? 'white' : '#000000',
            borderRadius: `${borderRadius}px`
          }}
        >
          Book a Demo
        </button>
      </div>
    </nav>
  );
}
