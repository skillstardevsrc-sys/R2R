import React from 'react';
import { Sparkles, Activity, Check } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import { ANIMATION_LEVELS, ANIMATION_FEATURES } from '../data/animationOptions';
import StepLayout from '../components/layout/StepLayout';
import OptionCard from '../components/ui/OptionCard';
import OptionGrid from '../components/ui/OptionGrid';

export default function StepAnimation() {
  const { state, updateAnimationLevel, toggleAnimationFeature, nextStep, prevStep } = usePlanner();
  const currentAnimation = state.animation || {};

  const isNone = currentAnimation.level === 'none';

  return (
    <StepLayout
      stepNumber={9}
      badge="Motion Choreography"
      title="How much motion and animation do you prefer?"
      subtitle="From pure static performance to high-impact immersive WebGL effects, calibrate your motion intensity."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={!!currentAnimation.level}
    >
      <div className="flex flex-col gap-8">
        {/* 1. Animation Intensity Levels */}
        <div>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Motion Intensity Tier</h3>
            <p className="text-xs text-text-muted mt-0.5">Select the baseline choreography level for your site.</p>
          </div>

          <OptionGrid columns={3}>
            {ANIMATION_LEVELS.map((tier) => {
              const isSelected = currentAnimation.level === tier.id;
              return (
                <OptionCard
                  key={tier.id}
                  id={tier.id}
                  title={tier.name}
                  description={tier.description}
                  isSelected={isSelected}
                  onClick={() => updateAnimationLevel(tier.id)}
                />
              );
            })}
          </OptionGrid>
        </div>

        {/* 2. Specific Micro-Interactions Checkboxes */}
        <div className={`bg-surface/70 border border-white/10 rounded-2xl p-6 sm:p-8 transition-opacity ${isNone ? 'opacity-40 pointer-events-none' : ''}`}>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div>
              <h3 className="text-base font-semibold text-white">Specific Interactive Motion Features</h3>
              <p className="text-xs text-text-muted mt-0.5">Fine-tune individual animation techniques to include.</p>
            </div>
            {isNone && (
              <span className="text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                Disabled (Static Mode Selected)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {ANIMATION_FEATURES.map((feature) => {
              const isChecked = !!currentAnimation[feature.id];
              return (
                <button
                  key={feature.id}
                  type="button"
                  disabled={isNone}
                  onClick={() => toggleAnimationFeature(feature.id)}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all
                    ${isChecked 
                      ? 'bg-surface/90 border-accent text-white shadow-accent-sm' 
                      : 'bg-black/30 border-white/10 text-text-muted hover:border-white/20 hover:text-white'}`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all
                      ${isChecked ? 'bg-accent text-black font-bold' : 'border border-white/20 bg-white/5'}`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-white block">{feature.label}</span>
                    <span className="text-[11px] text-text-muted/70 leading-relaxed block mt-0.5">{feature.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
