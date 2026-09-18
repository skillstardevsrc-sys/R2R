export const ANIMATION_LEVELS = [
  {
    id: 'none',
    name: 'None (Static)',
    description: 'Instant loading, zero movement, maximum raw performance and accessibility focus.',
    intensity: 0
  },
  {
    id: 'subtle',
    name: 'Subtle Micro-Interactions',
    description: 'Gentle button hovers, subtle fade-ins, restrained transitions.',
    intensity: 1
  },
  {
    id: 'modern',
    name: 'Modern Smooth',
    description: 'Card elevation, stagger list reveals, smooth anchor scrolling.',
    intensity: 2
  },
  {
    id: 'advanced',
    name: 'Advanced Dynamics',
    description: 'Parallax depth, text letter reveals, magnetic buttons, scroll choreography.',
    intensity: 3
  },
  {
    id: 'immersive',
    name: 'Immersive Experiential',
    description: 'Rich 3D motion, cursor trails, complex WebGL/canvas depth effects.',
    intensity: 4
  }
];

export const ANIMATION_FEATURES = [
  { id: 'smoothScroll', label: 'Smooth Scrolling', description: 'Fluid momentum scrolling physics' },
  { id: 'parallax', label: 'Parallax Layering', description: 'Background elements move at varying speeds' },
  { id: 'textReveal', label: 'Text Reveal Effects', description: 'Headlines animate in letter-by-letter or line-by-line' },
  { id: 'imageReveal', label: 'Image Mask Reveals', description: 'Curtain or scale-up reveal on view entry' },
  { id: 'magneticButtons', label: 'Magnetic Buttons', description: 'Buttons softly track cursor position on hover' },
  { id: 'cursorEffects', label: 'Custom Cursor Effects', description: 'Interactive cursor follower & state changes' },
  { id: 'threeD', label: '3D Interactions', description: 'Tilt cards and interactive spatial objects' },
  { id: 'pageTransitions', label: 'Page Transitions', description: 'Cinematic fade and slide when switching views' },
  { id: 'scrollAnimations', label: 'Scroll-Triggered Reveals', description: 'Elements fade and rise as user scrolls down' }
];
