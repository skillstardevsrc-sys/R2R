import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { usePlanner } from '../../context/PlannerContext';
import Badge from './Badge';

export default function OptionCard({
  id,
  title,
  subtitle,
  description,
  isSelected = false,
  onClick,
  onContinue,
  showContinueBtn = true,
  badge,
  children,
  icon: Icon,
  className = '',
  previewContent = null
}) {
  let nextStep;
  try {
    const planner = usePlanner();
    nextStep = planner?.nextStep;
  } catch (e) {
    // optional outside planner context
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col justify-between rounded-xl p-5 cursor-pointer text-left transition-all duration-200 outline-none select-none
        ${isSelected 
          ? 'bg-surface/90 border-2 border-accent shadow-accent-sm ring-1 ring-accent/30' 
          : 'bg-surface/60 border border-white/10 hover:border-white/25 hover:bg-surface-hover/80'}
        ${className}`}
    >
      {/* Top Header / Badges */}
      <div className="w-full mb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-accent/20 text-accent' : 'bg-white/5 text-text-muted group-hover:text-white'}`}>
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h4 className={`text-base font-semibold tracking-tight transition-colors ${isSelected ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                {title}
              </h4>
              {subtitle && (
                <span className="text-xs text-text-muted font-normal block mt-0.5">{subtitle}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <Badge variant={isSelected ? 'accent' : 'default'} size="xs">
                {badge}
              </Badge>
            )}

            {/* Selected Checkmark Indicator */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 shrink-0
                ${isSelected 
                  ? 'bg-accent text-black scale-100 opacity-100' 
                  : 'border border-white/20 opacity-0 group-hover:opacity-40 group-focus-visible:opacity-40'}`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
        </div>

        {description && (
          <p className="text-xs text-text-muted mt-2.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Visual Preview / Custom Child Content */}
      {previewContent && (
        <div className="mt-3 pt-3 border-t border-white/5 w-full">
          {previewContent}
        </div>
      )}

      {children && (
        <div className="mt-3 w-full">
          {children}
        </div>
      )}

      {/* Inline Continue Button on Selection */}
      {isSelected && showContinueBtn && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-3 border-t border-accent/25 flex items-center justify-between w-full"
        >
          <span className="text-[11px] text-accent font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5 stroke-[3]" /> Selected
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onContinue) {
                onContinue();
              } else if (nextStep) {
                nextStep();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-black text-xs font-bold hover:bg-amber-400 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
