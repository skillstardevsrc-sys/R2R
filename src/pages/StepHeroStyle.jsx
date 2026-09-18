import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { HERO_STYLES } from '../data/heroStyles';
import StepLayout from '../components/layout/StepLayout';
import OptionCard from '../components/ui/OptionCard';
import OptionGrid from '../components/ui/OptionGrid';

export default function StepHeroStyle() {
  const { state, updateHero, nextStep, prevStep } = usePlanner();
  const selectedHero = state.hero || 'split';

  return (
    <StepLayout
      stepNumber={7}
      badge="First Impression"
      title="Select your Hero Section layout."
      subtitle="The hero section is the highest impact real-estate on your website. Choose the layout that best delivers your core hook."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={!!selectedHero}
    >
      <OptionGrid columns={2}>
        {HERO_STYLES.map((hero) => {
          const isSelected = selectedHero === hero.id;
          return (
            <OptionCard
              key={hero.id}
              id={hero.id}
              title={hero.name}
              subtitle={hero.tagline}
              description={hero.description}
              isSelected={isSelected}
              onClick={() => updateHero(hero.id)}
              previewContent={
                <div className="h-20 rounded-lg bg-black/50 border border-white/10 p-3 flex items-center justify-between">
                  {hero.layoutType === 'split' && (
                    <div className="w-full flex items-center justify-between gap-3">
                      <div className="flex-1 space-y-1.5">
                        <div className="w-16 h-2 rounded bg-white/70" />
                        <div className="w-24 h-1.5 rounded bg-white/30" />
                        <div className="w-8 h-2 rounded bg-accent" />
                      </div>
                      <div className="w-14 h-12 rounded bg-white/10 border border-white/10" />
                    </div>
                  )}
                  {hero.layoutType === 'center' && (
                    <div className="w-full flex flex-col items-center justify-center gap-1.5 text-center">
                      <div className="w-28 h-2 rounded bg-white/70" />
                      <div className="w-36 h-1.5 rounded bg-white/30" />
                      <div className="w-12 h-2 rounded bg-accent mt-1" />
                    </div>
                  )}
                  {hero.layoutType === 'fullscreen' && (
                    <div className="w-full h-full bg-gradient-to-t from-black/90 to-white/10 rounded flex flex-col justify-end p-2">
                      <div className="w-20 h-2 rounded bg-white/80" />
                      <div className="w-10 h-1.5 rounded bg-accent mt-1" />
                    </div>
                  )}
                  {hero.layoutType === 'product' && (
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="w-32 h-10 rounded bg-white/10 border border-accent/40 shadow-sm flex items-center justify-center">
                        <span className="text-[9px] font-mono text-accent">UI Spotlight</span>
                      </div>
                    </div>
                  )}
                  {!['split', 'center', 'fullscreen', 'product'].includes(hero.layoutType) && (
                    <div className="w-full flex items-center justify-between">
                      <div className="w-20 h-2 rounded bg-white/80" />
                      <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent" />
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
