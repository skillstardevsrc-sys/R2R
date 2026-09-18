import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { WEBSITE_THEMES } from '../data/themes';
import StepLayout from '../components/layout/StepLayout';
import OptionCard from '../components/ui/OptionCard';
import OptionGrid from '../components/ui/OptionGrid';

export default function StepTheme() {
  const { state, updateTheme, nextStep, prevStep } = usePlanner();
  const selectedTheme = state.theme || 'dark-cinematic';

  return (
    <StepLayout
      stepNumber={5}
      badge="Atmosphere & Vibe"
      title="Choose your overarching website theme."
      subtitle="The visual theme dictates surface layering, lighting effects, transparency depth, and overall emotional tone."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={!!selectedTheme}
    >
      <OptionGrid columns={3}>
        {WEBSITE_THEMES.map((theme) => {
          const isSelected = selectedTheme === theme.id;
          return (
            <OptionCard
              key={theme.id}
              id={theme.id}
              title={theme.name}
              description={theme.description}
              badge={theme.badge}
              isSelected={isSelected}
              onClick={() => updateTheme(theme.id)}
              previewContent={
                <div className="h-16 rounded-lg bg-black/40 border border-white/10 p-2.5 flex items-center justify-between relative overflow-hidden">
                  {theme.visualType === 'cinematic' && (
                    <div className="w-full h-full bg-gradient-to-r from-black via-surface to-accent/20 rounded flex items-center px-3">
                      <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                    </div>
                  )}
                  {theme.visualType === 'glass' && (
                    <div className="w-full h-full bg-white/10 backdrop-blur-md rounded border border-white/20 flex items-center justify-center">
                      <span className="text-[10px] text-white/80 font-mono">backdrop-blur</span>
                    </div>
                  )}
                  {theme.visualType === 'minimal' && (
                    <div className="w-full h-full bg-surface rounded flex items-center justify-center border border-white/5">
                      <span className="text-[10px] text-white/40 tracking-widest uppercase">Pure Minimal</span>
                    </div>
                  )}
                  {theme.visualType === 'luxury' && (
                    <div className="w-full h-full bg-black rounded border border-accent/40 flex items-center justify-center">
                      <span className="text-[10px] text-accent tracking-widest uppercase font-serif">Luxury Edition</span>
                    </div>
                  )}
                  {theme.visualType === 'brutalist' && (
                    <div className="w-full h-full bg-white text-black font-mono font-black text-xs flex items-center justify-center border-2 border-black">
                      RAW BOLD
                    </div>
                  )}
                  {!['cinematic', 'glass', 'minimal', 'luxury', 'brutalist'].includes(theme.visualType) && (
                    <div className="w-full h-full bg-surface-hover rounded flex items-center justify-between px-3">
                      <div className="w-12 h-2 rounded bg-white/20" />
                      <div className="w-4 h-4 rounded bg-accent/30 border border-accent" />
                    </div>
                  )}
                </div>
              }
            />
          );
        })}
      </OptionGrid>
    </StepLayout>
  );
}
