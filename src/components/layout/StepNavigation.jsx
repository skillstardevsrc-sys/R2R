import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CornerDownLeft } from 'lucide-react';
import Button from '../ui/Button';

export default function StepNavigation({
  onNext,
  onPrev,
  onSkip,
  canContinue = true,
  nextLabel = 'Continue',
  prevLabel = 'Back',
  showSkip = false,
  showPrev = true,
  className = ''
}) {
  // Keyboard listener: Enter key to trigger continue if not typing in textarea or input with enter-handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && canContinue && !e.shiftKey) {
        // If the active element is a textarea or a button, do not hijack
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag === 'textarea') {
          return;
        }
        if (activeTag === 'button') {
          return;
        }
        e.preventDefault();
        onNext?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canContinue, onNext]);

  return (
    <div className={`w-full py-5 border-t border-white/10 mt-12 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sticky bottom-0 bg-bg/95 backdrop-blur-lg z-20 px-4 sm:px-0 ${className}`}>
      {/* Back Button */}
      <div>
        {showPrev && (
          <Button
            variant="ghost"
            size="md"
            icon={ArrowLeft}
            onClick={onPrev}
            className="w-full sm:w-auto text-text-muted hover:text-white"
          >
            {prevLabel}
          </Button>
        )}
      </div>

      {/* Right controls: Optional Skip + Continue */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {showSkip && (
          <Button
            variant="ghost"
            size="md"
            onClick={onSkip || onNext}
            className="text-text-muted text-xs hover:text-white"
          >
            Skip for now
          </Button>
        )}

        <Button
          variant="primary"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          disabled={!canContinue}
          onClick={onNext}
          className="w-full sm:w-auto min-w-[160px] min-h-[44px]"
        >
          <span>{nextLabel}</span>
          <span className="hidden lg:inline-flex items-center gap-0.5 text-[10px] opacity-70 ml-1.5 px-1.5 py-0.5 rounded bg-black/30 font-mono">
            <span>↵</span> Enter
          </span>
        </Button>
      </div>
    </div>
  );
}
