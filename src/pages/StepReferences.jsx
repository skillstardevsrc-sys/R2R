import React from 'react';
import { Globe, Plus, Sparkles, HelpCircle } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import StepLayout from '../components/layout/StepLayout';
import ReferenceForm from '../components/references/ReferenceForm';
import ReferenceCard from '../components/references/ReferenceCard';

export default function StepReferences() {
  const { state, addReference, updateReference, removeReference, nextStep, prevStep } = usePlanner();
  const references = state.references || [];

  return (
    <StepLayout
      stepNumber={13}
      badge="Design Benchmarks"
      title="Add Reference Websites for inspiration."
      subtitle="Share up to 5 websites you admire. Specify what you love about each (hero, motion, colors, typography, or layout)."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={true}
      showSkip={references.length === 0}
      nextLabel={references.length > 0 ? 'Continue' : 'Skip / Continue'}
    >
      <div className="flex flex-col gap-6">
        {/* Dynamic Add Form */}
        <ReferenceForm
          onAdd={addReference}
          currentCount={references.length}
          maxCount={5}
        />

        {/* Reference Cards List */}
        {references.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Added References ({references.length}/5)
              </span>
              <span className="text-xs text-accent">These will be included as clickable links in your PDF brief</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {references.map((ref, index) => (
                <ReferenceCard
                  key={ref.id || index}
                  reference={ref}
                  index={index}
                  onRemove={removeReference}
                  onUpdate={updateReference}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 border border-dashed border-white/10 rounded-2xl bg-surface/30 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">No reference websites added yet.</h4>
              <p className="text-xs text-text-muted mt-1 max-w-sm">
                Adding references helps our design team understand your exact taste before starting wireframes.
              </p>
            </div>
          </div>
        )}
      </div>
    </StepLayout>
  );
}
