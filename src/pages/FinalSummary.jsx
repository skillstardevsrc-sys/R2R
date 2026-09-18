import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  FileCheck,
  Download,
  Send,
  RotateCcw,
  Sparkles,
  Eye,
  CheckCircle2,
  Share2,
  Printer,
  ChevronRight
} from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import ExecutiveSummary from '../components/summary/ExecutiveSummary';
import VisualSpecBoard from '../components/summary/VisualSpecBoard';
import WhatsAppModal from '../components/summary/WhatsAppModal';
import WebsitePreview from '../components/preview/WebsitePreview';
import PDFDownloadBtn from '../components/pdf/PDFDownloadBtn';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function FinalSummary() {
  const { state, setIsStartOverModalOpen, goToStep } = usePlanner();
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [activeView, setActiveView] = useState('summary'); // 'summary' | 'live-preview'

  const brandName = state.client?.brandName || 'Your Brand';

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFFFFF', '#FFD700', '#52B788']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-surface-hover via-surface to-surface-hover border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="accent" size="sm">Discovery Complete</Badge>
              <span className="text-xs text-text-muted">• Ready for Development</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {brandName}’s Website Direction
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl">
              Your design preferences, visual tokens, layout blueprint, and typography have been compiled into a professional agency brief.
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <PDFDownloadBtn
              state={state}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-bold shadow-accent-sm"
            />

            <Button
              variant="secondary"
              size="lg"
              icon={Send}
              onClick={() => setIsWhatsAppOpen(true)}
              className="w-full sm:w-auto bg-emerald-600/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-600/30"
            >
              Send on WhatsApp
            </Button>
          </div>
        </div>

        {/* View Switcher Tabs (Design Brief vs Live Interactive Simulator) */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 p-1 bg-black/50 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setActiveView('summary')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all
                ${activeView === 'summary' ? 'bg-accent text-black shadow-md' : 'text-text-muted hover:text-white'}`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Design Brief & Specs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('live-preview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all
                ${activeView === 'live-preview' ? 'bg-accent text-black shadow-md' : 'text-text-muted hover:text-white'}`}
            >
              <Eye className="w-4 h-4" />
              <span>Interactive Website Simulator</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsStartOverModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset & Start Over</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeView === 'summary' ? (
        <div className="flex flex-col gap-8">
          {/* Executive Auto-Generated Summary */}
          <ExecutiveSummary state={state} />

          {/* Visual Spec Board */}
          <VisualSpecBoard state={state} />

          {/* Bottom Action Footer */}
          <div className="bg-surface/80 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="text-base font-semibold text-white">Your Design Brief is Finalized</h3>
              <p className="text-xs text-text-muted mt-0.5">Download the single-sheet executive Light PDF or share directly via WhatsApp.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <PDFDownloadBtn
                state={state}
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              />
              <Button
                variant="outline"
                size="md"
                icon={Send}
                onClick={() => setIsWhatsAppOpen(true)}
                className="w-full sm:w-auto text-emerald-400 border-emerald-500/30"
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <WebsitePreview state={state} />
        </div>
      )}

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        state={state}
      />
    </div>
  );
}
