import React from 'react';
import { Ban, X } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import { AVOID_OPTIONS } from '../data/avoidOptions';
import StepLayout from '../components/layout/StepLayout';
import OptionGrid from '../components/ui/OptionGrid';

export default function StepAvoid() {
  const { state, toggleAvoid, nextStep, prevStep } = usePlanner();
  const avoidList = state.avoid || [];

  return (
    <StepLayout
      stepNumber={14}
      badge="Anti-Goals"
      title="What elements should we strictly avoid?"
      subtitle="Knowing what you dislike is just as important as knowing what you love. Select anything you do NOT want on your site."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={true}
      showSkip={avoidList.length === 0}
      nextLabel={avoidList.length > 0 ? 'Continue' : 'Skip / Continue'}
    >
      <div className="flex flex-col gap-6">
        <OptionGrid columns={3}>
          {AVOID_OPTIONS.map((item) => {
            const isSelected = avoidList.includes(item.label);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleAvoid(item.label)}
                className={`p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition-all
                  ${isSelected 
                    ? 'bg-rose-950/40 border-rose-500/60 text-white shadow-md' 
                    : 'bg-surface/50 border-white/10 text-text-muted hover:border-white/20 hover:text-white'}`}
              >
                <span className="text-xs font-semibold leading-snug">{item.label}</span>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all
                    ${isSelected ? 'bg-rose-500 text-white font-bold' : 'border border-white/20'}`}
                >
                  {isSelected && <X className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </OptionGrid>
      </div>
    </StepLayout>
  );
}
