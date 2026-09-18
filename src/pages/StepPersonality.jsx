import React from 'react';
import { Sparkles, Check, AlertCircle } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import { PERSONALITY_TRAITS } from '../data/personalityTraits';
import StepLayout from '../components/layout/StepLayout';
import OptionGrid from '../components/ui/OptionGrid';

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
        <div className="flex items-center justify-between p-3.5 bg-surface/80 rounded-xl border border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs text-white/90 font-medium">
              Selected: <strong className="text-accent">{selectedTraits.length} / 3</strong> traits
            </span>
          </div>

          {selectedTraits.length >= 3 && (
            <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Maximum 3 selected
            </span>
          )}
        </div>

        {/* Personality Grid */}
        <OptionGrid columns={3}>
          {PERSONALITY_TRAITS.map((trait) => {
            const isSelected = selectedTraits.includes(trait.id);
            return (
              <button
                key={trait.id}
                type="button"
                onClick={() => togglePersonality(trait.id)}
                className={`p-5 rounded-xl border text-left flex items-start justify-between gap-3 transition-all duration-150 outline-none
                  ${isSelected 
                    ? 'bg-surface/90 border-2 border-accent shadow-accent-sm' 
                    : 'bg-surface/50 border-white/10 hover:border-white/20 hover:bg-surface-hover/80'}`}
              >
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
              </button>
            );
          })}
        </OptionGrid>
      </div>
    </StepLayout>
  );
}
