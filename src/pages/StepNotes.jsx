import React from 'react';
import { MessageSquare, FileText } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import StepLayout from '../components/layout/StepLayout';
import TextArea from '../components/ui/TextArea';

export default function StepNotes() {
  const { state, updateAdditionalNotes, nextStep, prevStep } = usePlanner();

  return (
    <StepLayout
      stepNumber={15}
      badge="Custom Specifications"
      title="Anything else we should know?"
      subtitle="Share any specific features, integrations, timeline targets, competitors, or special visual instructions."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={true}
      nextLabel="Generate Style Summary"
    >
      <div className="bg-surface/70 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-5">
        <TextArea
          id="additionalNotes"
          label="Additional Client Notes & Requirements"
          placeholder="Describe anything specific you want in your website (e.g. CRM integration, multi-language support, compliance requirements, specific micro-copy or target launch date)..."
          value={state.additionalNotes || ''}
          onChange={(e) => updateAdditionalNotes(e.target.value)}
          rows={7}
          maxLength={2000}
          helperText="Max 2,000 characters. These notes will be included verbatim in your final PDF brief."
        />
      </div>
    </StepLayout>
  );
}
