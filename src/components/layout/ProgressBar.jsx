import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ currentStep, totalSteps }) {
  if (currentStep <= 0) return null;

  const percentage = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div className="w-full bg-surface/50 border-b border-white/5 sticky top-[57px] z-30">
      <div className="w-full h-1 bg-white/5 relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent/80 via-accent to-amber-200"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>

      {/* Mobile step bar text */}
      <div className="md:hidden px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-text-muted bg-surface/90">
        <span>Step {String(currentStep).padStart(2, '0')} of {String(totalSteps).padStart(2, '0')}</span>
        <span className="text-accent font-semibold">{percentage}% Complete</span>
      </div>
    </div>
  );
}
