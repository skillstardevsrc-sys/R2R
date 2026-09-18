import React from 'react';
import { BORDER_RADIUS_TIERS } from '../../data/uiStyles';

export default function RangeSelector({
  value = 20,
  onChange,
  className = ''
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Border Radius / Corner Geometry
        </label>
        <span className="text-xs font-mono text-accent bg-accent-soft px-2.5 py-1 rounded-md border border-accent/20">
          {value}px
        </span>
      </div>

      {/* Visual tier selector buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {BORDER_RADIUS_TIERS.map((tier) => {
          const isSelected = value === tier.value;
          return (
            <button
              key={tier.value}
              type="button"
              onClick={() => onChange(tier.value)}
              className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border transition-all text-center
                ${isSelected 
                  ? 'bg-surface/90 border-2 border-accent text-white shadow-accent-sm' 
                  : 'bg-surface/50 border-white/10 text-text-muted hover:border-white/20 hover:text-white'}`}
            >
              {/* Dynamic corner shape preview */}
              <div
                className={`w-10 h-10 border-2 transition-all flex items-center justify-center
                  ${isSelected ? 'border-accent bg-accent-soft' : 'border-white/30 bg-white/5'}`}
                style={{ borderRadius: tier.radiusCss }}
              >
                <span className="text-[10px] font-mono font-semibold text-white/90">
                  {tier.value}
                </span>
              </div>

              <div>
                <div className="text-xs font-semibold text-white">{tier.label}</div>
                <div className="text-[10px] text-text-muted/70">{tier.value}px</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
