export function generateDesignSummary(state) {
  const brand = state.client.brandName || 'The brand';
  const purpose = state.client.websitePurpose === 'Other' && state.client.customPurpose
    ? state.client.customPurpose
    : state.client.websitePurpose || 'digital presence';
  const direction = state.direction.websiteType || 'Modern';
  const theme = state.theme || 'Dark Cinematic';
  const paletteName = state.colors.preset || 'custom color scheme';
  const headingFont = state.typography.heading || 'Inter';
  const bodyFont = state.typography.body || 'Inter';
  const cardStyle = state.ui.cardStyle || 'border';
  const buttonStyle = state.ui.buttonStyle || 'rounded';
  const radius = state.ui.borderRadius !== undefined ? `${state.ui.borderRadius}px` : '12px';
  const heroStyle = state.hero || 'split';
  const navStyle = state.navigation || 'floating';
  const animLevel = state.animation.level || 'modern';
  const imageStyle = state.imagery.style || 'Real Photography';
  const density = state.contentDensity || 'balanced';
  const personality = state.personality && state.personality.length > 0
    ? state.personality.join(', ')
    : 'Professional, Modern';

  const paragraphs = [];

  // Paragraph 1: Core Identity & Direction
  paragraphs.push(
    `${brand}’s new ${purpose.toLowerCase()} will follow an elevated ${direction.toLowerCase()} direction with a ${theme.toLowerCase()} theme. The visual system is rooted in a ${paletteName.toLowerCase()} palette (primary: ${state.colors.primary}, accent: ${state.colors.accent}), projecting a brand personality characterized as ${personality.toLowerCase()}.`
  );

  // Paragraph 2: Typography & UI System
  paragraphs.push(
    `Typography pairs ${headingFont} for high-impact headlines with ${bodyFont} for optimal body legibility across all screen sizes. The user interface will feature ${cardStyle.toLowerCase()} cards with a ${radius} corner geometry, complemented by ${buttonStyle.toLowerCase()} interactive controls.`
  );

  // Paragraph 3: Layout, Motion & Experience
  paragraphs.push(
    `The digital experience begins with a ${heroStyle.toLowerCase()} hero architecture framed by a ${navStyle.toLowerCase()} navigation system. Media direction emphasizes ${imageStyle.toLowerCase()} within a ${density.toLowerCase()} content density layout, enriched with ${animLevel.toLowerCase()} animation choreographies.`
  );

  // Additional note if avoid list exists
  if (state.avoid && state.avoid.length > 0) {
    const avoidLabels = state.avoid.join(', ');
    paragraphs.push(
      `Specific anti-goals and constraints to avoid include: ${avoidLabels}.`
    );
  }

  return paragraphs.join('\n\n');
}
