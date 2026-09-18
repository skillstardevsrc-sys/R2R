import React from 'react';
import { motion } from 'framer-motion';
import StepNavigation from './StepNavigation';

export default function StepLayout({
  stepNumber,
  totalSteps = 15,
  badge,
  title,
  subtitle,
  children,
  onNext,
  onPrev,
  onSkip,
  canContinue = true,
  nextLabel = 'Continue',
  prevLabel = 'Back',
  showSkip = false,
  showPrev = true,
  maxWidth = 'max-w-4xl'
}) {
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      <div className={`w-full ${maxWidth} mx-auto`}>
        {/* Step Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2.5">
            {stepNumber !== undefined && (
              <span className="text-xs font-mono font-semibold tracking-wider text-accent bg-accent-soft px-2.5 py-1 rounded-md border border-accent/20">
                STEP {String(stepNumber).padStart(2, '0')}
              </span>
            )}
            {badge && (
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted/80 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                {badge}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="text-sm sm:text-base text-text-muted mt-2 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Step Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>

      {/* Step Footer Navigation */}
      <div className={`w-full ${maxWidth} mx-auto`}>
        <StepNavigation
          onNext={onNext}
          onPrev={onPrev}
          onSkip={onSkip}
          canContinue={canContinue}
          nextLabel={nextLabel}
          prevLabel={prevLabel}
          showSkip={showSkip}
          showPrev={showPrev}
        />
      </div>
    </div>
  );
}
