import React from 'react';
import { Sparkles, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import { PERSONALITY_TRAITS } from '../data/personalityTraits';
import StepLayout from '../components/layout/StepLayout';
import OptionGrid from '../components/ui/OptionGrid';
import Button from '../components/ui/Button';

export default function StepPersonality() {
  const { state, togglePersonality, nextStep, prevStep } = usePlanner();
  const selectedTraits = state.personality || [];

  return (
    <StepLayout
      stepNumber={12}
      badge="Brand Psychology"
      title="Select your Website Personality (Choose up to 3)."
      subtitle="These brand archetypes guide copy voice, micro-copy, button wording, and visual flair."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={selectedTraits.length > 0}
    >
      <div className="flex flex-col gap-6">
        {/* Counter & Helper bar */}
        <div className="flex items-center justify-between p-3.5 bg-surface/80 rounded-xl border border-white/10 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs text-white/90 font-medium">
              Selected: <strong className="text-accent">{selectedTraits.length} / 3</strong> traits
            </span>
          </div>

          <div className="flex items-center gap-3">
            {selectedTraits.length >= 3 && (
              <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Maximum 3 selected
              </span>
            )}

            {selectedTraits.length > 0 && (
              <Button
                variant="primary"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={nextStep}
                className="font-bold shadow-accent-sm"
              >
                Continue
              </Button>
            )}
          </div>
        </div>

        {/* Personality Grid */}
        <OptionGrid columns={3}>
          {PERSONALITY_TRAITS.map((trait) => {
            const isSelected = selectedTraits.includes(trait.id);
            return (
              <div
                key={trait.id}
                role="button"
                tabIndex={0}
                onClick={() => togglePersonality(trait.id)}
                className={`p-5 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all duration-150 outline-none cursor-pointer select-none
                  ${isSelected 
                    ? 'bg-surface/90 border-2 border-accent shadow-accent-sm ring-1 ring-accent/30' 
                    : 'bg-surface/50 border-white/10 hover:border-white/20 hover:bg-surface-hover/80'}`}
              >
                <div className="flex items-start justify-between gap-3 w-full">
                  <div>
                    <span className={`text-base font-semibold block transition-colors ${isSelected ? 'text-white' : 'text-white/90'}`}>
                      {trait.label}
                    </span>
                    <span className="text-xs text-text-muted mt-1 block leading-relaxed">
                      {trait.desc}
                    </span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all
                      ${isSelected ? 'bg-accent text-black scale-100' : 'border border-white/20 opacity-40'}`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Inline Continue Button on Selection */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-accent/25 flex items-center justify-between w-full">
                    <span className="text-[11px] text-accent font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Selected
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextStep();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-bold hover:bg-amber-400 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </OptionGrid>
      </div>
    </StepLayout>
  );
}
