import React, { useState } from 'react';
import { usePlanner } from './context/PlannerContext';
import Header from './components/layout/Header';
import ProgressBar from './components/layout/ProgressBar';
import Toast from './components/ui/Toast';
import Modal from './components/ui/Modal';
import Button from './components/ui/Button';
import WebsitePreview from './components/preview/WebsitePreview';

// Page steps
import Welcome from './pages/Welcome';
import StepClientInfo from './pages/StepClientInfo';
import StepWebsiteType from './pages/StepWebsiteType';
import StepColorPalette from './pages/StepColorPalette';
import StepTypography from './pages/StepTypography';
import StepTheme from './pages/StepTheme';
import StepUIStyle from './pages/StepUIStyle';
import StepHeroStyle from './pages/StepHeroStyle';
import StepNavigation from './pages/StepNavigation';
import StepAnimation from './pages/StepAnimation';
import StepImagery from './pages/StepImagery';
import StepContentDensity from './pages/StepContentDensity';
import StepPersonality from './pages/StepPersonality';
import StepReferences from './pages/StepReferences';
import StepAvoid from './pages/StepAvoid';
import StepNotes from './pages/StepNotes';
import FinalSummary from './pages/FinalSummary';

export default function App() {
  const {
    state,
    currentStep,
    totalSteps,
    toastMessage,
    closeToast,
    isStartOverModalOpen,
    setIsStartOverModalOpen,
    isHowItWorksOpen,
    setIsHowItWorksOpen,
    resetPlanner
  } = usePlanner();

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <Welcome />;
      case 1: return <StepClientInfo />;
      case 2: return <StepWebsiteType />;
      case 3: return <StepColorPalette />;
      case 4: return <StepTypography />;
      case 5: return <StepTheme />;
      case 6: return <StepUIStyle />;
      case 7: return <StepHeroStyle />;
      case 8: return <StepNavigation />;
      case 9: return <StepAnimation />;
      case 10: return <StepImagery />;
      case 11: return <StepContentDensity />;
      case 12: return <StepPersonality />;
      case 13: return <StepReferences />;
      case 14: return <StepAvoid />;
      case 15: return <StepNotes />;
      case 16: return <FinalSummary />;
      default: return <Welcome />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-main flex flex-col justify-between selection:bg-accent/30 selection:text-white font-inter">
      {/* Top Header */}
      <Header onOpenLivePreview={() => setIsPreviewModalOpen(true)} />

      {/* Top Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* Main Multi-Step Content */}
      <main className="flex-1 w-full relative">
        {renderStepContent()}
      </main>

      {/* Toast Notification Container */}
      <Toast toast={toastMessage} onClose={closeToast} />

      {/* Live Preview Modal (accessible during any step) */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Live Website Style Board"
        subtitle="Real-time simulation of your selected colors, fonts, hero layout, and UI components."
        maxWidth="max-w-6xl"
      >
        <div className="pt-2">
          <WebsitePreview state={state} isModal={true} />
        </div>
      </Modal>

      {/* "Start Over" Confirmation Modal */}
      <Modal
        isOpen={isStartOverModalOpen}
        onClose={() => setIsStartOverModalOpen(false)}
        title="Reset Planner Progress?"
        subtitle="This will clear all current selections and local draft data."
        maxWidth="max-w-md"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-muted">
            Are you sure you want to start over? All your entered information, color tokens, and reference websites will be reset.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsStartOverModalOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              size="md"
              onClick={resetPlanner}
            >
              Yes, Reset Everything
            </Button>
          </div>
        </div>
      </Modal>

      {/* "How It Works" Modal */}
      <Modal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        title="How Website Style Planner Works"
        subtitle="A modern design-discovery tool designed for seamless agency-to-client collaboration."
        maxWidth="max-w-xl"
      >
        <div className="space-y-4 text-sm text-text-muted">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-white/5">
            <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center shrink-0">1</span>
            <div>
              <strong className="text-white block">Step-by-step visual questionnaire</strong>
              <span>Select aesthetic archetypes, colors, typography, hero layouts, and animations through interactive visual cards.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-white/5">
            <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center shrink-0">2</span>
            <div>
              <strong className="text-white block">Instant Live Preview</strong>
              <span>Watch your selections update a live responsive website style simulator across desktop, tablet, and mobile viewports.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-white/5">
            <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center shrink-0">3</span>
            <div>
              <strong className="text-white block">Agency-Grade PDF Brief & WhatsApp Delivery</strong>
              <span>Download a multi-page vector PDF design brief with color swatches and clickable links, and send formatted briefs via WhatsApp.</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="md" onClick={() => setIsHowItWorksOpen(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
