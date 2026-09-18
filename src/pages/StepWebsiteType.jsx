import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { WEBSITE_DIRECTIONS } from '../data/websiteTypes';
import StepLayout from '../components/layout/StepLayout';
import OptionCard from '../components/ui/OptionCard';
import OptionGrid from '../components/ui/OptionGrid';

export default function StepWebsiteType() {
  const { state, updateDirection, nextStep, prevStep } = usePlanner();
  const selectedType = state.direction?.websiteType || 'Modern';

  return (
    <StepLayout
      stepNumber={2}
      badge="Strategic Direction"
      title="What primary direction best fits your website?"
      subtitle="Select the primary aesthetic archetype that represents your brand’s personality and industry posture."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={!!selectedType}
    >
      <OptionGrid columns={3}>
        {WEBSITE_DIRECTIONS.map((dir) => {
          const isSelected = selectedType === dir.id;
          return (
            <OptionCard
              key={dir.id}
              id={dir.id}
              title={dir.name}
              subtitle={dir.tagline}
              description={dir.description}
              isSelected={isSelected}
              onClick={() => updateDirection(dir.id)}
            />
          );
        })}
      </OptionGrid>
    </StepLayout>
  );
}
