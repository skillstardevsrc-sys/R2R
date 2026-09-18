import React from 'react';
import { Sparkles, Bookmark, RotateCcw, HelpCircle, Eye } from 'lucide-react';
import { usePlanner } from '../../context/PlannerContext';
import Button from '../ui/Button';

export default function Header({ onOpenLivePreview }) {
  const {
    currentStep,
    totalSteps,
    saveProgress,
    setIsStartOverModalOpen,
    setIsHowItWorksOpen
  } = usePlanner();

  const formattedStep = currentStep > 0 && currentStep <= totalSteps
    ? `${String(currentStep).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}`
    : null;

  return (
    <header className="sticky top-0 z-40 w-full bg-bg/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shadow-accent-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight text-white block">
              Website Style Planner
            </span>
            <span className="text-[10px] uppercase tracking-widest text-text-muted hidden sm:inline-block">
              Agency Discovery Engine
            </span>
          </div>
        </div>

        {/* Step Indicator (when inside questionnaire) */}
        {formattedStep && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="text-xs font-mono font-medium text-accent">STEP</span>
            <span className="text-xs font-mono font-semibold text-white">{formattedStep}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Preview Toggle button for desktop */}
          {currentStep > 0 && currentStep < 16 && (
            <Button
              variant="outline"
              size="sm"
              icon={Eye}
              onClick={onOpenLivePreview}
              className="text-xs hidden sm:inline-flex"
            >
              Live Preview
            </Button>
          )}

          <button
            type="button"
            onClick={() => setIsHowItWorksOpen(true)}
            className="p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="How It Works"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {currentStep > 0 && (
            <button
              type="button"
              onClick={saveProgress}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted hover:text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10"
              title="Save progress locally"
            >
              <Bookmark className="w-3.5 h-3.5 text-accent" />
              <span className="hidden sm:inline">Save</span>
            </button>
          )}

          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setIsStartOverModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors"
              title="Start Over"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
