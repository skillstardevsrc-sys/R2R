import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { BUTTON_STYLES, CARD_STYLES } from '../data/uiStyles';
import StepLayout from '../components/layout/StepLayout';
import OptionCard from '../components/ui/OptionCard';
import OptionGrid from '../components/ui/OptionGrid';
import RangeSelector from '../components/ui/RangeSelector';

export default function StepUIStyle() {
  const { state, updateUi, nextStep, prevStep } = usePlanner();
  const currentUi = state.ui || {};

  return (
    <StepLayout
      stepNumber={6}
      badge="Design System Tokens"
      title="Define your UI component styling."
      subtitle="Configure how interactive buttons, feature cards, and corner radii behave across your entire website."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={!!currentUi.buttonStyle && !!currentUi.cardStyle}
    >
      <div className="flex flex-col gap-10">
        {/* 1. Border Radius Selector */}
        <div className="bg-surface/70 border border-white/10 rounded-2xl p-6 shadow-xl">
          <RangeSelector
            value={currentUi.borderRadius !== undefined ? currentUi.borderRadius : 20}
            onChange={(val) => updateUi({ borderRadius: val })}
          />
        </div>

        {/* 2. Button Styles */}
        <div>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Button Controls</h3>
            <p className="text-xs text-text-muted mt-0.5">Choose the primary visual treatment for calls-to-action.</p>
          </div>

          <OptionGrid columns={3}>
            {BUTTON_STYLES.map((btn) => {
              const isSelected = currentUi.buttonStyle === btn.id;
              return (
                <OptionCard
                  key={btn.id}
                  id={btn.id}
                  title={btn.name}
                  description={btn.description}
                  isSelected={isSelected}
                  onClick={() => updateUi({ buttonStyle: btn.id })}
                  previewContent={
                    <div className="flex items-center justify-center p-3 bg-black/40 rounded-lg">
                      <div className={btn.previewClass}>
                        Action Button
                      </div>
                    </div>
                  }
                />
              );
            })}
          </OptionGrid>
        </div>

        {/* 3. Card Styles */}
        <div>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Card & Surface Styles</h3>
            <p className="text-xs text-text-muted mt-0.5">Select how content containers and feature cards are presented.</p>
          </div>

          <OptionGrid columns={3}>
            {CARD_STYLES.map((card) => {
              const isSelected = currentUi.cardStyle === card.id;
              return (
                <OptionCard
                  key={card.id}
                  id={card.id}
                  title={card.name}
                  description={card.description}
                  isSelected={isSelected}
                  onClick={() => updateUi({ cardStyle: card.id })}
                  previewContent={
                    <div className="p-2 bg-black/40 rounded-lg">
                      <div className={`rounded-lg ${card.previewClass}`}>
                        <span className="text-[11px] font-semibold text-white block">Preview Surface</span>
                        <span className="text-[10px] text-text-muted">High visual clarity</span>
                      </div>
                    </div>
                  }
                />
              );
            })}
          </OptionGrid>
        </div>
      </div>
    </StepLayout>
  );
}
