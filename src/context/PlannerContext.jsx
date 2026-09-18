import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRESET_PALETTES } from '../data/palettes';
import { validateClientInfo } from '../utils/validation';

const STORAGE_KEY = 'website-style-planner-draft';
const TOTAL_STEPS = 15;

const INITIAL_STATE = {
  client: {
    brandName: '',
    contactPerson: '',
    whatsapp: '',
    email: '',
    businessCategory: 'Technology & Software',
    description: '',
    websitePurpose: 'Business Website',
    customPurpose: ''
  },
  direction: {
    websiteType: 'Modern'
  },
  colors: {
    preset: 'Black + Gold',
    primary: '#080808',
    secondary: '#171717',
    accent: '#D4AF37',
    background: '#080808',
    text: '#FFFFFF'
  },
  typography: {
    heading: 'Manrope',
    body: 'Inter',
    pairing: 'pairing-modern'
  },
  theme: 'dark-cinematic',
  ui: {
    buttonStyle: 'rounded',
    cardStyle: 'glass',
    borderRadius: 20
  },
  hero: 'split',
  navigation: 'floating',
  animation: {
    level: 'modern',
    smoothScroll: true,
    parallax: false,
    textReveal: true,
    imageReveal: true,
    magneticButtons: false,
    cursorEffects: false,
    threeD: false,
    pageTransitions: true,
    scrollAnimations: true
  },
  imagery: {
    style: 'real-photo',
    shape: 'rounded'
  },
  contentDensity: 'balanced',
  personality: ['Professional', 'Premium', 'Creative'],
  references: [],
  avoid: [],
  additionalNotes: ''
};

const PlannerContext = createContext();

export function PlannerProvider({ children }) {
  // Current step: 0 = Welcome, 1..15 = Steps, 16 = Final Summary
  const [currentStep, setCurrentStep] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [isStartOverModalOpen, setIsStartOverModalOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Initialize state from localStorage if available
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATE,
          ...parsed,
          client: { ...INITIAL_STATE.client, ...parsed.client },
          direction: { ...INITIAL_STATE.direction, ...parsed.direction },
          colors: { ...INITIAL_STATE.colors, ...parsed.colors },
          typography: { ...INITIAL_STATE.typography, ...parsed.typography },
          ui: { ...INITIAL_STATE.ui, ...parsed.ui },
          animation: { ...INITIAL_STATE.animation, ...parsed.animation },
          imagery: { ...INITIAL_STATE.imagery, ...parsed.imagery }
        };
      }
    } catch (e) {
      console.error('Error loading saved draft:', e);
    }
    return INITIAL_STATE;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error auto-saving draft:', e);
    }
  }, [state]);

  // Helper to convert hex (#D4AF37) to RGB channels ('212 175 55')
  const hexToRgbChannels = (hexStr, defaultRgb = '212 175 55') => {
    if (!hexStr || typeof hexStr !== 'string') return defaultRgb;
    let hex = hexStr.replace('#', '').trim();
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length !== 6) return defaultRgb;
    const num = parseInt(hex, 16);
    if (isNaN(num)) return defaultRgb;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `${r} ${g} ${b}`;
  };

  // Apply dynamic CSS variables for theme and colors
  useEffect(() => {
    const root = document.documentElement;
    const accentHex = state.colors.accent || '#D4AF37';
    const bgHex = state.colors.background || '#080808';
    const surfaceHex = state.colors.secondary || '#171717';

    root.style.setProperty('--accent', hexToRgbChannels(accentHex, '212 175 55'));
    root.style.setProperty('--accent-soft', `${accentHex}25`);
    root.style.setProperty('--accent-glow', `${accentHex}66`);
    root.style.setProperty('--bg', hexToRgbChannels(bgHex, '8 8 8'));
    root.style.setProperty('--surface', hexToRgbChannels(surfaceHex, '23 23 23'));
    root.style.setProperty('--text-main', hexToRgbChannels(state.colors.text || '#FFFFFF', '255 255 255'));
  }, [state.colors]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  const updateClientInfo = (fields) => {
    setState(prev => ({
      ...prev,
      client: { ...prev.client, ...fields }
    }));
  };

  const updateDirection = (websiteType) => {
    setState(prev => ({
      ...prev,
      direction: { websiteType }
    }));
  };

  const selectColorPreset = (presetId) => {
    const found = PRESET_PALETTES.find(p => p.id === presetId);
    if (found) {
      setState(prev => ({
        ...prev,
        colors: {
          preset: found.name,
          primary: found.primary,
          secondary: found.secondary,
          accent: found.accent,
          background: found.background,
          text: found.text
        }
      }));
    }
  };

  const updateCustomColors = (colorUpdates) => {
    setState(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        ...colorUpdates,
        preset: 'Custom Palette'
      }
    }));
  };

  const updateTypography = (typographyUpdates) => {
    setState(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        ...typographyUpdates
      }
    }));
  };

  const updateTheme = (themeId) => {
    setState(prev => ({ ...prev, theme: themeId }));
  };

  const updateUi = (uiUpdates) => {
    setState(prev => ({
      ...prev,
      ui: { ...prev.ui, ...uiUpdates }
    }));
  };

  const updateHero = (heroId) => {
    setState(prev => ({ ...prev, hero: heroId }));
  };

  const updateNavigation = (navId) => {
    setState(prev => ({ ...prev, navigation: navId }));
  };

  const updateAnimationLevel = (levelId) => {
    setState(prev => {
      let features = { ...prev.animation };
      if (levelId === 'none') {
        features = {
          level: 'none',
          smoothScroll: false,
          parallax: false,
          textReveal: false,
          imageReveal: false,
          magneticButtons: false,
          cursorEffects: false,
          threeD: false,
          pageTransitions: false,
          scrollAnimations: false
        };
      } else if (levelId === 'immersive') {
        features = {
          level: 'immersive',
          smoothScroll: true,
          parallax: true,
          textReveal: true,
          imageReveal: true,
          magneticButtons: true,
          cursorEffects: true,
          threeD: true,
          pageTransitions: true,
          scrollAnimations: true
        };
      } else {
        features.level = levelId;
      }
      return {
        ...prev,
        animation: features
      };
    });
  };

  const toggleAnimationFeature = (featureKey) => {
    setState(prev => ({
      ...prev,
      animation: {
        ...prev.animation,
        [featureKey]: !prev.animation[featureKey]
      }
    }));
  };

  const updateImagery = (imageryUpdates) => {
    setState(prev => ({
      ...prev,
      imagery: { ...prev.imagery, ...imageryUpdates }
    }));
  };

  const updateContentDensity = (densityId) => {
    setState(prev => ({ ...prev, contentDensity: densityId }));
  };

  const togglePersonality = (traitId) => {
    setState(prev => {
      const current = prev.personality || [];
      if (current.includes(traitId)) {
        return {
          ...prev,
          personality: current.filter(t => t !== traitId)
        };
      } else {
        if (current.length >= 3) {
          showToast('You can choose up to 3 personality traits.', 'warning');
          return prev;
        }
        return {
          ...prev,
          personality: [...current, traitId]
        };
      }
    });
  };

  const addReference = (refData) => {
    if (state.references.length >= 5) {
      showToast('Maximum 5 reference websites allowed.', 'warning');
      return false;
    }
    const newRef = {
      id: Date.now().toString(),
      url: refData.url,
      domain: refData.domain,
      likes: refData.likes || [],
      note: refData.note || ''
    };
    setState(prev => ({
      ...prev,
      references: [...prev.references, newRef]
    }));
    showToast('Reference website added!', 'success');
    return true;
  };

  const updateReference = (id, updatedFields) => {
    setState(prev => ({
      ...prev,
      references: prev.references.map(ref => (ref.id === id ? { ...ref, ...updatedFields } : ref))
    }));
    showToast('Reference website updated.', 'success');
  };

  const removeReference = (id) => {
    setState(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
    showToast('Reference removed.', 'info');
  };

  const toggleAvoid = (avoidLabel) => {
    setState(prev => {
      const current = prev.avoid || [];
      if (current.includes(avoidLabel)) {
        return { ...prev, avoid: current.filter(a => a !== avoidLabel) };
      }
      return { ...prev, avoid: [...current, avoidLabel] };
    });
  };

  const updateAdditionalNotes = (notes) => {
    setState(prev => ({ ...prev, additionalNotes: notes }));
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      const { isValid, errors } = validateClientInfo(state.client);
      if (!isValid) {
        const firstError = Object.values(errors)[0];
        showToast(firstError, 'error');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < 16) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step) => {
    if (step > currentStep && !validateCurrentStep()) return;
    if (step >= 0 && step <= 16) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetPlanner = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setState(INITIAL_STATE);
    setCurrentStep(0);
    setIsStartOverModalOpen(false);
    showToast('Planner has been reset to defaults.', 'info');
  };

  const saveProgress = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      showToast('Progress saved securely on this device.', 'success');
    } catch (e) {
      showToast('Unable to save progress to local storage.', 'error');
    }
  };

  return (
    <PlannerContext.Provider
      value={{
        state,
        currentStep,
        totalSteps: TOTAL_STEPS,
        nextStep,
        prevStep,
        goToStep,
        updateClientInfo,
        updateDirection,
        selectColorPreset,
        updateCustomColors,
        updateTypography,
        updateTheme,
        updateUi,
        updateHero,
        updateNavigation,
        updateAnimationLevel,
        toggleAnimationFeature,
        updateImagery,
        updateContentDensity,
        togglePersonality,
        addReference,
        updateReference,
        removeReference,
        toggleAvoid,
        updateAdditionalNotes,
        resetPlanner,
        saveProgress,
        toastMessage,
        showToast,
        closeToast,
        isStartOverModalOpen,
        setIsStartOverModalOpen,
        isHowItWorksOpen,
        setIsHowItWorksOpen
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
}
