import React, { useState } from 'react';
import { Copy, Check, FileText, Sparkles } from 'lucide-react';
import { generateDesignSummary } from '../../utils/summaryGenerator';
import Badge from '../ui/Badge';

export default function ExecutiveSummary({ state }) {
  const [copied, setCopied] = useState(false);
  const summary = generateDesignSummary(state);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-surface/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20 text-accent border border-accent/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Executive Design Direction</h3>
              <Badge variant="accent" size="xs">AI Synthesized</Badge>
            </div>
            <p className="text-xs text-text-muted">Automated natural language brief for designers & stakeholders</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted hover:text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Summary</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-5 space-y-4 text-sm text-text-muted leading-relaxed font-normal">
        {summary.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="bg-black/30 p-4 rounded-xl border border-white/5 text-white/90">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
