import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, FileCheck, Layers, Eye, CheckCircle2, ChevronRight } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import Button from '../components/ui/Button';

export default function Welcome() {
  const { nextStep, setIsHowItWorksOpen, state } = usePlanner();

  const metadata = [
    { icon: Clock, label: '15–20 minutes' },
    { icon: Eye, label: 'Visual preference planner' },
    { icon: FileCheck, label: 'Design brief generated automatically' }
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        {/* Metadata Chips */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6"
        >
          {metadata.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-text-muted"
              >
                <Icon className="w-3.5 h-3.5 text-accent" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
        >
          Let’s Design <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-accent">
            Your Website.
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Tell us how you want your website to look, feel and behave.
          We’ll turn your choices into a clear, executive-grade design direction and downloadable brief.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            variant="primary"
            size="xl"
            icon={ArrowRight}
            iconPosition="right"
            onClick={nextStep}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Start Planning
          </Button>

          <Button
            variant="secondary"
            size="xl"
            onClick={() => setIsHowItWorksOpen(true)}
            className="w-full sm:w-auto min-w-[160px]"
          >
            How It Works
          </Button>
        </motion.div>

        {/* Minimal CSS Abstract Visual Composition (Colors + Typography + Cards + Layout) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-3xl mx-auto p-6 sm:p-8 bg-surface/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl relative"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {/* 1. Color Palette Abstract Swatch */}
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider">01 // COLOR HARMONY</span>
              <div className="flex gap-2 my-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/20" />
                <div className="w-8 h-8 rounded-lg bg-surface-hover border border-white/10" />
                <div className="w-8 h-8 rounded-lg bg-accent" />
                <div className="w-8 h-8 rounded-lg bg-white" />
              </div>
              <span className="text-xs text-text-muted">Dynamic Token Engine</span>
            </div>

            {/* 2. Typography Composition */}
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider">02 // TYPOGRAPHY</span>
              <div className="my-2">
                <div className="text-lg font-bold text-white font-manrope">Manrope + Inter</div>
                <div className="text-[11px] text-text-muted">Balanced reading rhythm</div>
              </div>
              <span className="text-xs text-text-muted">Curated Pairings</span>
            </div>

            {/* 3. Component Architecture */}
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider">03 // UI BLUEPRINT</span>
              <div className="flex items-center gap-2 my-3">
                <div className="px-3 py-1 bg-accent rounded-lg text-black text-[10px] font-bold">Button</div>
                <div className="px-3 py-1 bg-white/10 rounded-lg text-white text-[10px] border border-white/20">Glass</div>
              </div>
              <span className="text-xs text-text-muted">Automated PDF Brief</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
