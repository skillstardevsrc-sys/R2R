import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { CONTENT_DENSITIES } from '../data/imageStyles';
import StepLayout from '../components/layout/StepLayout';
import OptionCard from '../components/ui/OptionCard';
import OptionGrid from '../components/ui/OptionGrid';

export default function StepContentDensity() {
  const { state, updateContentDensity, nextStep, prevStep } = usePlanner();
  const selectedDensity = state.contentDensity || 'balanced';

  return (
    <StepLayout
      stepNumber={11}
      badge="Information Architecture"
      title="How dense should your website content be?"
      subtitle="Content density determines spacing, typography scales, section heights, and reading pacing."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={!!selectedDensity}
    >
      <OptionGrid columns={3}>
        {CONTENT_DENSITIES.map((density) => {
          const isSelected = selectedDensity === density.id;
          return (
            <OptionCard
              key={density.id}
              id={density.id}
              title={density.name}
              subtitle={density.tagline}
              description={density.description}
              isSelected={isSelected}
              onClick={() => updateContentDensity(density.id)}
            />
          );
        })}
      </OptionGrid>
    </StepLayout>
  );
}
