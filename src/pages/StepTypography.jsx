import React, { useState } from 'react';
import { Type, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import { HEADING_FONTS, BODY_FONTS, FONT_PAIRINGS } from '../data/fonts';
import StepLayout from '../components/layout/StepLayout';
import OptionCard from '../components/ui/OptionCard';
import OptionGrid from '../components/ui/OptionGrid';

export default function StepTypography() {
  const { state, updateTypography, nextStep, prevStep } = usePlanner();
  const [activeTab, setActiveTab] = useState('pairings'); // 'pairings' | 'custom'

  const currentTypography = state.typography || {};

  const handleSelectPairing = (pairing) => {
    updateTypography({
      heading: pairing.heading,
      body: pairing.body,
      pairing: pairing.id
    });
  };

  return (
    <StepLayout
      stepNumber={4}
      badge="Typography Engine"
      title="Define your typography system."
      subtitle="Select a curated typeface pairing engineered for visual hierarchy, or customize heading and body typefaces independently."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={!!currentTypography.heading && !!currentTypography.body}
    >
      <div className="flex flex-col gap-6">
        {/* Toggle Mode */}
        <div className="flex items-center gap-2 p-1 bg-surface/80 rounded-xl border border-white/10 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('pairings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all
              ${activeTab === 'pairings' ? 'bg-accent text-black shadow-md' : 'text-text-muted hover:text-white'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recommended Pairings ({FONT_PAIRINGS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all
              ${activeTab === 'custom' ? 'bg-accent text-black shadow-md' : 'text-text-muted hover:text-white'}`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Custom Font Selection</span>
          </button>
        </div>

        {/* Tab 1: Recommended Font Pairings */}
        {activeTab === 'pairings' && (
          <OptionGrid columns={2}>
            {FONT_PAIRINGS.map((pairing) => {
              const isSelected = currentTypography.heading === pairing.heading && currentTypography.body === pairing.body;
              return (
                <OptionCard
                  key={pairing.id}
                  id={pairing.id}
                  title={pairing.name}
                  subtitle={`${pairing.heading} + ${pairing.body}`}
                  description={pairing.description}
                  badge={pairing.vibe}
                  isSelected={isSelected}
                  onClick={() => handleSelectPairing(pairing)}
                  previewContent={
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                      <div
                        className="text-lg sm:text-xl font-bold text-white tracking-tight"
                        style={{ fontFamily: pairing.heading }}
                      >
                        Build something memorable.
                      </div>
                      <div
                        className="text-xs text-text-muted leading-relaxed"
                        style={{ fontFamily: pairing.body }}
                      >
                        Clean typographic hierarchy ensures effortless scanning and high reader retention across all digital touchpoints.
                      </div>
                    </div>
                  }
                />
              );
            })}
          </OptionGrid>
        )}

        {/* Tab 2: Custom Independent Headings & Body */}
        {activeTab === 'custom' && (
          <div className="flex flex-col gap-8">
            {/* Heading Font Select */}
            <div className="bg-surface/70 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Select Heading Typeface
                  </h3>
                  <span className="text-xs text-text-muted">Used for hero titles, section headlines, and banners</span>
                </div>
                <span className="text-xs font-mono text-accent">Active: {currentTypography.heading}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HEADING_FONTS.map((font) => {
                  const isSelected = currentTypography.heading === font.id;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => updateTypography({ heading: font.id, pairing: 'custom' })}
                      className={`p-4 rounded-xl border text-left transition-all
                        ${isSelected ? 'bg-surface/90 border-2 border-accent shadow-accent-sm' : 'bg-black/40 border-white/10 hover:border-white/20'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-text-muted">{font.name}</span>
                        <span className="text-[10px] text-text-muted/60">{font.category}</span>
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white truncate" style={{ fontFamily: font.name }}>
                        {font.sample}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Body Font Select */}
            <div className="bg-surface/70 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Select Body Typeface
                  </h3>
                  <span className="text-xs text-text-muted">Used for paragraphs, feature descriptions, and buttons</span>
                </div>
                <span className="text-xs font-mono text-accent">Active: {currentTypography.body}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BODY_FONTS.map((font) => {
                  const isSelected = currentTypography.body === font.id;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => updateTypography({ body: font.id, pairing: 'custom' })}
                      className={`p-4 rounded-xl border text-left transition-all
                        ${isSelected ? 'bg-surface/90 border-2 border-accent shadow-accent-sm' : 'bg-black/40 border-white/10 hover:border-white/20'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-text-muted">{font.name}</span>
                        <span className="text-[10px] text-text-muted/60">{font.category}</span>
                      </div>
                      <div className="text-xs text-white/90 leading-relaxed line-clamp-2" style={{ fontFamily: font.name }}>
                        {font.sample}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </StepLayout>
  );
}
