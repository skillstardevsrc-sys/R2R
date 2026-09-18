import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { NAVIGATION_STYLES } from '../data/navigationStyles';
import StepLayout from '../components/layout/StepLayout';
import OptionCard from '../components/ui/OptionCard';
import OptionGrid from '../components/ui/OptionGrid';

export default function StepNavigation() {
  const { state, updateNavigation, nextStep, prevStep } = usePlanner();
  const selectedNav = state.navigation || 'floating';

  return (
    <StepLayout
      stepNumber={8}
      badge="Header Experience"
      title="Choose your Navigation header style."
      subtitle="The navigation structure anchors user orientation and dictates how visitors access your product offerings."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={!!selectedNav}
    >
      <OptionGrid columns={2}>
        {NAVIGATION_STYLES.map((nav) => {
          const isSelected = selectedNav === nav.id;
          return (
            <OptionCard
              key={nav.id}
              id={nav.id}
              title={nav.name}
              description={nav.description}
              isSelected={isSelected}
              onClick={() => updateNavigation(nav.id)}
              previewContent={
                <div className="h-14 rounded-lg bg-black/50 border border-white/10 p-2.5 flex items-center justify-between">
                  {nav.type === 'floating' && (
                    <div className="w-full mx-2 h-7 bg-white/10 border border-white/15 rounded-full px-3 flex items-center justify-between">
                      <div className="w-8 h-2 rounded bg-white/60" />
                      <div className="flex gap-1.5">
                        <div className="w-4 h-1.5 rounded bg-white/30" />
                        <div className="w-4 h-1.5 rounded bg-white/30" />
                      </div>
                      <div className="w-6 h-3 rounded-full bg-accent" />
                    </div>
                  )}
                  {nav.type === 'center-logo' && (
                    <div className="w-full flex items-center justify-between px-2">
                      <div className="w-10 h-1.5 rounded bg-white/30" />
                      <div className="w-6 h-3 rounded bg-accent/80 font-bold" />
                      <div className="w-10 h-1.5 rounded bg-white/30" />
                    </div>
                  )}
                  {nav.type === 'minimal' || nav.type === 'fullscreen' ? (
                    <div className="w-full flex items-center justify-between px-3">
                      <div className="w-12 h-2 rounded bg-white/70" />
                      <div className="w-5 h-3 rounded bg-white/10 border border-white/20 flex flex-col justify-center items-center gap-0.5">
                        <div className="w-3 h-0.5 bg-white" />
                        <div className="w-3 h-0.5 bg-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-between px-2">
                      <div className="w-12 h-2.5 rounded bg-white/70" />
                      <div className="flex gap-2">
                        <div className="w-6 h-1.5 rounded bg-white/30" />
                        <div className="w-6 h-1.5 rounded bg-white/30" />
                      </div>
                      <div className="w-8 h-3 rounded bg-accent" />
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
