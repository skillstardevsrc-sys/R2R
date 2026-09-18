import React, { useState } from 'react';
import { Palette, Sliders, Check, Sparkles } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import { PRESET_PALETTES } from '../data/palettes';
import StepLayout from '../components/layout/StepLayout';
import OptionCard from '../components/ui/OptionCard';
import OptionGrid from '../components/ui/OptionGrid';
import ColorPicker from '../components/ui/ColorPicker';

export default function StepColorPalette() {
  const { state, selectColorPreset, updateCustomColors, nextStep, prevStep } = usePlanner();
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'custom'

  const currentColors = state.colors || {};

  return (
    <StepLayout
      stepNumber={3}
      badge="Color Atmosphere"
      title="Choose your website's color palette."
      subtitle="Select an agency-curated palette or customize exact HEX values for your primary, secondary, and accent colors."
      onNext={nextStep}
      onPrev={prevStep}
      canContinue={!!currentColors.primary}
    >
      <div className="flex flex-col gap-6">
        {/* Tab Toggle: Presets vs Custom Color Studio */}
        <div className="flex items-center gap-2 p-1 bg-surface/80 rounded-xl border border-white/10 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all
              ${activeTab === 'presets' ? 'bg-accent text-black shadow-md' : 'text-text-muted hover:text-white'}`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Curated Agency Palettes ({PRESET_PALETTES.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all
              ${activeTab === 'custom' ? 'bg-accent text-black shadow-md' : 'text-text-muted hover:text-white'}`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Custom Color Studio</span>
          </button>
        </div>

        {/* Tab 1: Preset Palettes */}
        {activeTab === 'presets' && (
          <OptionGrid columns={3}>
            {PRESET_PALETTES.map((palette) => {
              const isSelected = currentColors.preset === palette.name;
              return (
                <OptionCard
                  key={palette.id}
                  id={palette.id}
                  title={palette.name}
                  subtitle={palette.category}
                  description={palette.description}
                  badge={palette.tag}
                  isSelected={isSelected}
                  onClick={() => selectColorPreset(palette.id)}
                  previewContent={
                    <div className="flex items-center gap-2">
                      <div
                        className="flex-1 h-8 rounded-md border border-white/10 shadow-inner flex items-center justify-center text-[9px] font-mono font-bold text-white"
                        style={{ backgroundColor: palette.primary }}
                        title={`Primary: ${palette.primary}`}
                      >
                        Pri
                      </div>
                      <div
                        className="flex-1 h-8 rounded-md border border-white/10 shadow-inner flex items-center justify-center text-[9px] font-mono font-bold text-white/80"
                        style={{ backgroundColor: palette.secondary }}
                        title={`Secondary: ${palette.secondary}`}
                      >
                        Sec
                      </div>
                      <div
                        className="flex-1 h-8 rounded-md border border-white/20 shadow-md flex items-center justify-center text-[9px] font-mono font-bold text-black"
                        style={{ backgroundColor: palette.accent }}
                        title={`Accent: ${palette.accent}`}
                      >
                        Acc
                      </div>
                      <div
                        className="w-8 h-8 rounded-md border border-white/10 shadow-inner flex items-center justify-center text-[9px] font-mono font-bold text-black"
                        style={{ backgroundColor: palette.text }}
                        title={`Text: ${palette.text}`}
                      >
                        Txt
                      </div>
                    </div>
                  }
                />
              );
            })}
          </OptionGrid>
        )}

        {/* Tab 2: Custom Color Studio */}
        {activeTab === 'custom' && (
          <div className="bg-surface/70 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-base font-semibold text-white">Bespoke Brand Color Tokens</h3>
                <p className="text-xs text-text-muted mt-0.5">Edit HEX values or click color swatch to open native visual picker.</p>
              </div>
              <span className="text-xs font-mono text-accent bg-accent-soft px-3 py-1 rounded-md border border-accent/20">
                Live Dynamic Engine
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <ColorPicker
                label="Accent Color (Glow & CTAs)"
                value={currentColors.accent || '#D4AF37'}
                onChange={(val) => updateCustomColors({ accent: val })}
                helperText="Primary highlight for buttons, icons & links"
              />

              <ColorPicker
                label="Primary Background"
                value={currentColors.background || '#080808'}
                onChange={(val) => updateCustomColors({ background: val })}
                helperText="Main backdrop for the page body"
              />

              <ColorPicker
                label="Secondary Surface (Cards)"
                value={currentColors.secondary || '#171717'}
                onChange={(val) => updateCustomColors({ secondary: val })}
                helperText="Card background and elevated surfaces"
              />

              <ColorPicker
                label="Primary Brand Color"
                value={currentColors.primary || '#080808'}
                onChange={(val) => updateCustomColors({ primary: val })}
                helperText="Dominant brand foundation shade"
              />

              <ColorPicker
                label="Typography / Text Color"
                value={currentColors.text || '#FFFFFF'}
                onChange={(val) => updateCustomColors({ text: val })}
                helperText="Color for headlines and main content"
              />
            </div>
          </div>
        )}
      </div>
    </StepLayout>
  );
}
