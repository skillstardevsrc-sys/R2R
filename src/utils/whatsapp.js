export function formatWhatsAppMessage(state) {
  const brand = state.client.brandName || 'N/A';
  const purpose = state.client.websitePurpose === 'Other' && state.client.customPurpose
    ? state.client.customPurpose
    : state.client.websitePurpose || 'N/A';
  const theme = state.theme || 'Modern';
  const palette = state.colors.preset || `${state.colors.primary} / ${state.colors.accent}`;
  const heading = state.typography.heading || 'Inter';
  const body = state.typography.body || 'Inter';
  const ui = `${state.ui.cardStyle || 'Border'} Cards + ${state.ui.buttonStyle || 'Rounded'} Buttons (${state.ui.borderRadius}px radius)`;
  const hero = state.hero || 'Split Hero';
  const animation = state.animation.level || 'Modern';

  let referencesText = 'None specified';
  if (state.references && state.references.length > 0) {
    referencesText = state.references.map(r => r.domain || r.url).join('\n• ');
    referencesText = '• ' + referencesText;
  }

  const lines = [
    `✨ *WEBSITE DESIGN PREFERENCE BRIEF* ✨`,
    ``,
    `Hi! Here is the compiled website design brief for *${brand}*.`,
    ``,
    `📌 *Brand / Company:* ${brand}`,
    `👤 *Contact:* ${state.client.contactPerson || 'N/A'}`,
    `🎯 *Website Purpose:* ${purpose}`,
    `🏷️ *Category:* ${state.client.businessCategory || 'N/A'}`,
    ``,
    `🎨 *Theme & Colors:*`,
    `• Theme: ${theme}`,
    `• Palette: ${palette}`,
    `• Primary: ${state.colors.primary} | Accent: ${state.colors.accent}`,
    ``,
    `🔤 *Typography:*`,
    `• Heading: ${heading}`,
    `• Body: ${body}`,
    ``,
    `📐 *UI & Layout:*`,
    `• UI Style: ${ui}`,
    `• Hero Layout: ${hero}`,
    `• Navigation: ${state.navigation || 'Floating'}`,
    `• Animation: ${animation}`,
    `• Content Density: ${state.contentDensity || 'Balanced'}`,
    ``,
    `🌐 *Reference Websites:*`,
    `${referencesText}`,
    ``,
    state.additionalNotes ? `📝 *Notes:* "${state.additionalNotes.slice(0, 250)}${state.additionalNotes.length > 250 ? '...' : ''}"\n` : '',
    `📄 *Design Brief PDF is ready and attached!*`,
    `Generated via Website Style Planner`
  ].filter(line => line !== undefined);

  return lines.join('\n');
}

export function generateWhatsAppLink(phoneNumber, message) {
  // Clean phone number (remove all non-digit characters)
  const cleanNumber = phoneNumber ? phoneNumber.replace(/[^0-9]/g, '') : '';
  const encodedText = encodeURIComponent(message);
  
  if (cleanNumber) {
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  }
  return `https://wa.me/?text=${encodedText}`;
}
