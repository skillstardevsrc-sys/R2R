export const BUTTON_STYLES = [
  {
    id: 'rounded',
    name: 'Rounded',
    description: 'Modern standard rounded rectangle (8-12px radius)',
    previewClass: 'rounded-lg bg-accent text-black font-medium px-4 py-2 shadow-sm'
  },
  {
    id: 'pill',
    name: 'Pill',
    description: 'Fully rounded ends for a modern, friendly feel',
    previewClass: 'rounded-full bg-accent text-black font-medium px-5 py-2 shadow-sm'
  },
  {
    id: 'square',
    name: 'Square',
    description: 'Sharp corners for Swiss, brutalist, or strict architectural feel',
    previewClass: 'rounded-none bg-accent text-black font-medium px-4 py-2'
  },
  {
    id: 'outline',
    name: 'Outline',
    description: 'Transparent background with crisp accent colored border',
    previewClass: 'rounded-lg border border-accent text-accent font-medium px-4 py-2 hover:bg-accent/10'
  },
  {
    id: 'glass',
    name: 'Glass',
    description: 'Semi-transparent frosted glass with subtle border reflection',
    previewClass: 'rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium px-4 py-2'
  },
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Smooth energetic color gradient fill with high click appeal',
    previewClass: 'rounded-lg bg-gradient-to-r from-accent to-amber-200 text-black font-semibold px-4 py-2 shadow-md'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Flat understated surface with subtle hover transition',
    previewClass: 'rounded-md bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2'
  }
];

export const CARD_STYLES = [
  {
    id: 'border',
    name: 'Fine Border',
    description: 'Subtle 1px border with high contrast separation and clean aesthetics.',
    previewClass: 'border border-white/15 bg-surface/80 p-4'
  },
  {
    id: 'glass',
    name: 'Frosted Glass',
    description: 'Translucent background with backdrop blur and delicate top edge highlight.',
    previewClass: 'bg-white/5 backdrop-blur-md border border-white/10 p-4 shadow-glass'
  },
  {
    id: 'flat',
    name: 'Flat Surface',
    description: 'Pure solid surface color without heavy borders or drop shadows.',
    previewClass: 'bg-surface p-4'
  },
  {
    id: 'shadow',
    name: 'Deep Shadow',
    description: 'Elevated surface with ambient multi-layer drop shadows for depth.',
    previewClass: 'bg-surface shadow-2xl border border-white/5 p-4'
  },
  {
    id: 'floating',
    name: 'Floating Elevation',
    description: 'Slightly raised cards with soft ambient glow and floating feel.',
    previewClass: 'bg-surface-hover shadow-card border border-white/10 p-4 transform -translate-y-1'
  },
  {
    id: 'three-d',
    name: '3D Layered',
    description: 'Chamfered edges and isometric lighting for tangible digital product feel.',
    previewClass: 'bg-surface border-t border-white/30 border-b border-black/80 shadow-2xl p-4'
  },
  {
    id: 'no-cards',
    name: 'No Cards (Seamless)',
    description: 'Open fluid layout where typography and dividers define structure.',
    previewClass: 'bg-transparent border-b border-white/10 p-4'
  }
];

export const BORDER_RADIUS_TIERS = [
  { value: 0, label: 'Sharp', description: '0px - Brutalist & Architectural', radiusCss: '0px' },
  { value: 6, label: 'Small', description: '6px - Subtle & Precise', radiusCss: '6px' },
  { value: 12, label: 'Medium', description: '12px - Balanced & Standard', radiusCss: '12px' },
  { value: 20, label: 'Large', description: '20px - Modern & Soft', radiusCss: '20px' },
  { value: 32, label: 'Extra Rounded', description: '32px - Playful & Fluid', radiusCss: '32px' }
];
