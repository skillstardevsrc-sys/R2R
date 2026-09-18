import React from 'react';
import { usePlanner } from '../context/PlannerContext';
import { IMAGE_STYLES, IMAGE_SHAPES } from '../data/imageStyles';
import StepLayout from '../components/layout/StepLayout';
import OptionCard from '../components/ui/OptionCard';
import OptionGrid from '../components/ui/OptionGrid';

export default function StepImagery() {
  const { state, updateImagery, nextStep, prevStep } = usePlanner();
  const currentImagery = state.imagery || {};

  return (
    <StepLayout
      stepNumber={10}
      badge="Media Direction"
      title="Define your Imagery & Graphic style."
      subtitle="Visual assets establish brand authenticity. Choose your preferred media type and frame geometry."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={!!currentImagery.style && !!currentImagery.shape}
    >
      <div className="flex flex-col gap-10">
        {/* 1. Image Style */}
        <div>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Visual Medium</h3>
            <p className="text-xs text-text-muted mt-0.5">Select the primary creative format for imagery.</p>
          </div>

          <OptionGrid columns={4}>
            {IMAGE_STYLES.map((img) => {
              const isSelected = currentImagery.style === img.id;
              return (
                <OptionCard
                  key={img.id}
                  id={img.id}
                  title={img.name}
                  description={img.description}
                  isSelected={isSelected}
                  onClick={() => updateImagery({ style: img.id })}
                />
              );
            })}
          </OptionGrid>
        </div>

        {/* 2. Image Shape & Framing */}
        <div>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Frame Geometry & Shape</h3>
            <p className="text-xs text-text-muted mt-0.5">Define corner masking and aspect ratios for media blocks.</p>
          </div>

          <OptionGrid columns={3}>
            {IMAGE_SHAPES.map((shape) => {
              const isSelected = currentImagery.shape === shape.id;
              return (
                <OptionCard
                  key={shape.id}
                  id={shape.id}
                  title={shape.name}
                  description={shape.description}
                  isSelected={isSelected}
                  onClick={() => updateImagery({ shape: shape.id })}
                />
              );
            })}
          </OptionGrid>
        </div>
      </div>
    </StepLayout>
  );
}
