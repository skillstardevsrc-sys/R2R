import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Sparkles, RefreshCw } from 'lucide-react';
import PreviewNavbar from './PreviewNavbar';
import PreviewHero from './PreviewHero';
import PreviewCards from './PreviewCards';
import PreviewCTA from './PreviewCTA';
import PreviewFooter from './PreviewFooter';

export default function WebsitePreview({ state, isModal = false }) {
  const [viewport, setViewport] = useState('desktop'); // desktop | tablet | mobile

  const brandName = state.client?.brandName || 'Acme Corp';
  const colors = state.colors || {};
  const typography = state.typography || {};
  const ui = state.ui || {};
  const heroStyle = state.hero || 'split';
  const navStyle = state.navigation || 'floating';
  const imagery = state.imagery || {};

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return 'max-w-[390px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'w-full';
    }
  };

  return (
    <div className={`w-full flex flex-col bg-surface/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md transition-all ${isModal ? 'max-h-[85vh]' : ''}`}>
      {/* Top Preview Bar & Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface/90 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider font-semibold text-white/90 uppercase">
              LIVE STYLE PREVIEW
            </span>
          </div>
        </div>

        {/* Viewport Selectors */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded transition-colors ${viewport === 'desktop' ? 'bg-white/20 text-white' : 'text-text-muted hover:text-white'}`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded transition-colors ${viewport === 'tablet' ? 'bg-white/20 text-white' : 'text-text-muted hover:text-white'}`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded transition-colors ${viewport === 'mobile' ? 'bg-white/20 text-white' : 'text-text-muted hover:text-white'}`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Current Theme Spec */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-text-muted">
          <span className="text-accent">{colors.preset || 'Theme'}</span>
          <span>•</span>
          <span>{typography.heading || 'Manrope'} + {typography.body || 'Inter'}</span>
        </div>
      </div>

      {/* Simulator Viewport Canvas */}
      <div className="w-full overflow-y-auto bg-black/50 p-4 sm:p-6 flex justify-center items-start min-h-[420px] max-h-[700px]">
        <div
          className={`${getViewportWidth()} w-full transition-all duration-300 rounded-xl overflow-hidden border border-white/10 shadow-2xl relative`}
          style={{
            backgroundColor: colors.background || '#080808',
            color: colors.text || '#FFFFFF',
            fontFamily: typography.body || 'Inter'
          }}
        >
          {/* Mock Browser Header inside viewport */}
          <div className="w-full bg-surface/80 border-b border-white/10 px-3 py-1.5 flex items-center justify-between text-[10px] text-text-muted">
            <span className="truncate">{brandName.toLowerCase().replace(/\s+/g, '')}.com</span>
            <span className="font-mono text-accent text-[9px] uppercase">{state.direction?.websiteType || 'Modern'} Direction</span>
          </div>

          {/* Navigation */}
          <PreviewNavbar
            brandName={brandName}
            navStyle={navStyle}
            accentColor={colors.accent || '#D4AF37'}
            borderRadius={ui.borderRadius || 20}
            headingFont={typography.heading || 'Manrope'}
            buttonStyle={ui.buttonStyle || 'rounded'}
          />

          {/* Hero Section */}
          <PreviewHero
            brandName={brandName}
            heroStyle={heroStyle}
            accentColor={colors.accent || '#D4AF37'}
            borderRadius={ui.borderRadius || 20}
            headingFont={typography.heading || 'Manrope'}
            bodyFont={typography.body || 'Inter'}
            buttonStyle={ui.buttonStyle || 'rounded'}
            imageShape={imagery.shape || 'rounded'}
            imageStyle={imagery.style || 'real-photo'}
          />

          {/* Feature Cards */}
          <PreviewCards
            cardStyle={ui.cardStyle || 'border'}
            borderRadius={ui.borderRadius || 20}
            accentColor={colors.accent || '#D4AF37'}
            headingFont={typography.heading || 'Manrope'}
            bodyFont={typography.body || 'Inter'}
          />

          {/* Call to Action */}
          <PreviewCTA
            brandName={brandName}
            accentColor={colors.accent || '#D4AF37'}
            borderRadius={ui.borderRadius || 20}
            headingFont={typography.heading || 'Manrope'}
            buttonStyle={ui.buttonStyle || 'rounded'}
          />

          {/* Footer */}
          <PreviewFooter
            brandName={brandName}
            accentColor={colors.accent || '#D4AF37'}
            headingFont={typography.heading || 'Manrope'}
            bodyFont={typography.body || 'Inter'}
          />
        </div>
      </div>
    </div>
  );
}
