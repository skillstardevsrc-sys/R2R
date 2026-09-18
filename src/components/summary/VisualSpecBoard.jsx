import React, { useState } from 'react';
import {
  Palette,
  Type,
  Layout,
  Sliders,
  ExternalLink,
  Check,
  X,
  Copy,
  Sparkles,
  Layers,
  Image,
  Globe
} from 'lucide-react';
import Badge from '../ui/Badge';

export default function VisualSpecBoard({ state }) {
  const [copiedHex, setCopiedHex] = useState(null);

  const colors = state.colors || {};
  const typography = state.typography || {};
  const ui = state.ui || {};

  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Brand & Direction Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface/80 border border-white/10 rounded-xl p-4">
          <span className="text-[10px] font-mono text-text-muted uppercase">Brand / Client</span>
          <div className="text-base font-bold text-white mt-1 truncate">{state.client?.brandName || 'N/A'}</div>
          <span className="text-xs text-text-muted">{state.client?.businessCategory}</span>
        </div>

        <div className="bg-surface/80 border border-white/10 rounded-xl p-4">
          <span className="text-[10px] font-mono text-text-muted uppercase">Website Purpose</span>
          <div className="text-base font-bold text-white mt-1 truncate">
            {state.client?.websitePurpose === 'Other' ? state.client?.customPurpose : state.client?.websitePurpose}
          </div>
          <span className="text-xs text-text-muted">Target Objective</span>
        </div>

        <div className="bg-surface/80 border border-white/10 rounded-xl p-4">
          <span className="text-[10px] font-mono text-text-muted uppercase">Visual Direction</span>
          <div className="text-base font-bold text-white mt-1">{state.direction?.websiteType || 'Modern'}</div>
          <span className="text-xs text-text-muted">{state.theme || 'Dark Cinematic'} Theme</span>
        </div>

        <div className="bg-surface/80 border border-white/10 rounded-xl p-4">
          <span className="text-[10px] font-mono text-text-muted uppercase">Contact Dispatch</span>
          <div className="text-base font-bold text-white mt-1 truncate">{state.client?.contactPerson || 'N/A'}</div>
          <span className="text-xs font-mono text-accent truncate">{state.client?.whatsapp || 'N/A'}</span>
        </div>
      </div>

      {/* 2. Color Palette & Swatches */}
      <div className="bg-surface/80 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-accent" />
            <h4 className="text-base font-semibold text-white">Color System ({colors.preset || 'Custom'})</h4>
          </div>
          <span className="text-xs text-text-muted">Click HEX code to copy</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: 'Background', hex: colors.background || '#080808' },
            { label: 'Surface', hex: colors.secondary || '#171717' },
            { label: 'Primary Brand', hex: colors.primary || '#080808' },
            { label: 'Accent Glow', hex: colors.accent || '#D4AF37' },
            { label: 'Typography', hex: colors.text || '#FFFFFF' }
          ].map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleCopyHex(c.hex)}
              className="group flex flex-col items-start p-3 bg-black/40 border border-white/10 rounded-xl hover:border-white/30 transition-all text-left"
            >
              <div
                className="w-full h-12 rounded-lg border border-white/15 mb-2 shadow-inner group-hover:scale-[1.02] transition-transform"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-[10px] text-text-muted uppercase font-medium">{c.label}</span>
              <div className="flex items-center justify-between w-full mt-1">
                <span className="text-xs font-mono font-bold text-white">{c.hex}</span>
                {copiedHex === c.hex ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Typography Specs */}
      <div className="bg-surface/80 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-5">
          <Type className="w-5 h-5 text-accent" />
          <h4 className="text-base font-semibold text-white">Typography Pairing</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-black/40 border border-white/10 rounded-xl">
            <span className="text-[10px] font-mono text-accent uppercase">Heading Typeface</span>
            <div className="text-xl font-bold text-white mt-1" style={{ fontFamily: typography.heading || 'Manrope' }}>
              {typography.heading || 'Manrope'}
            </div>
            <p className="text-xs text-text-muted mt-2 border-t border-white/5 pt-2" style={{ fontFamily: typography.heading || 'Manrope' }}>
              The quick brown fox jumps over the lazy dog. 0123456789
            </p>
          </div>

          <div className="p-5 bg-black/40 border border-white/10 rounded-xl">
            <span className="text-[10px] font-mono text-accent uppercase">Body Typeface</span>
            <div className="text-xl font-bold text-white mt-1" style={{ fontFamily: typography.body || 'Inter' }}>
              {typography.body || 'Inter'}
            </div>
            <p className="text-xs text-text-muted mt-2 border-t border-white/5 pt-2" style={{ fontFamily: typography.body || 'Inter' }}>
              Carefully formatted paragraph copy ensuring crisp legibility on high-DPI displays.
            </p>
          </div>
        </div>
      </div>

      {/* 4. UI System & Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface/80 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10 mb-4">
            <Sliders className="w-5 h-5 text-accent" />
            <h4 className="text-sm font-semibold text-white">UI & Component System</h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-text-muted">Button Style</span>
              <span className="font-semibold text-white capitalize">{ui.buttonStyle || 'Rounded'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-text-muted">Card Surface Style</span>
              <span className="font-semibold text-white capitalize">{ui.cardStyle || 'Border'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-text-muted">Border Radius</span>
              <span className="font-semibold text-accent font-mono">{ui.borderRadius}px</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-text-muted">Content Density</span>
              <span className="font-semibold text-white capitalize">{state.contentDensity || 'Balanced'}</span>
            </div>
          </div>
        </div>

        <div className="bg-surface/80 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10 mb-4">
            <Layout className="w-5 h-5 text-accent" />
            <h4 className="text-sm font-semibold text-white">Layout & Experience</h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-text-muted">Hero Layout</span>
              <span className="font-semibold text-white capitalize">{state.hero || 'Split Hero'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-text-muted">Navigation Style</span>
              <span className="font-semibold text-white capitalize">{state.navigation || 'Floating Navbar'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-text-muted">Animation Level</span>
              <span className="font-semibold text-white capitalize">{state.animation?.level || 'Modern'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-text-muted">Imagery Direction</span>
              <span className="font-semibold text-white capitalize">{state.imagery?.style || 'Real Photography'} ({state.imagery?.shape})</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Reference Websites */}
      {state.references && state.references.length > 0 && (
        <div className="bg-surface/80 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-5">
            <Globe className="w-5 h-5 text-accent" />
            <h4 className="text-base font-semibold text-white">Reference Websites ({state.references.length})</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {state.references.map((ref, idx) => (
              <div key={idx} className="p-4 bg-black/40 border border-white/10 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white font-mono">{ref.domain}</span>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  {ref.likes && ref.likes.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {ref.likes.map((like, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10">
                          {like}
                        </span>
                      ))}
                    </div>
                  )}
                  {ref.note && (
                    <p className="text-xs text-text-muted italic bg-surface/50 p-2 rounded border border-white/5">
                      "{ref.note}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
