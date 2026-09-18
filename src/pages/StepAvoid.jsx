import React from 'react';
import { Ban, X, ArrowRight, Check } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import { AVOID_OPTIONS } from '../data/avoidOptions';
import StepLayout from '../components/layout/StepLayout';
import OptionGrid from '../components/ui/OptionGrid';
import Button from '../components/ui/Button';

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
        {avoidList.length > 0 && (
          <div className="flex items-center justify-between p-3.5 bg-rose-950/30 rounded-xl border border-rose-500/30">
            <span className="text-xs text-rose-300 font-medium">
              Selected <strong className="text-white">{avoidList.length}</strong> items to avoid
            </span>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={nextStep}
              className="font-bold shadow-md"
            >
              Continue
            </Button>
          </div>
        )}

        <OptionGrid columns={3}>
          {AVOID_OPTIONS.map((item) => {
            const isSelected = avoidList.includes(item.label);
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => toggleAvoid(item.label)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer select-none
                  ${isSelected 
                    ? 'bg-rose-950/40 border-2 border-rose-500/60 text-white shadow-md' 
                    : 'bg-surface/50 border-white/10 text-text-muted hover:border-white/20 hover:text-white'}`}
              >
                <div className="flex items-center justify-between gap-3 w-full">
                  <span className="text-xs font-semibold leading-snug">{item.label}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all
                      ${isSelected ? 'bg-rose-500 text-white font-bold' : 'border border-white/20'}`}
                  >
                    {isSelected && <X className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {isSelected && (
                  <div className="pt-2 border-t border-rose-500/20 flex items-center justify-between w-full">
                    <span className="text-[11px] text-rose-300 font-medium">Excluded</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextStep();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500 text-white text-xs font-bold hover:bg-rose-400 transition-all shadow-md active:scale-95 cursor-pointer"
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
