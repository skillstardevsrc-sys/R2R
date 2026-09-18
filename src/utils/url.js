export function normalizeUrl(input) {
  if (!input) return '';
  let trimmed = input.trim();
  
  // Disallow malicious schemes
  if (/^(javascript:|data:|file:|vbscript:)/i.test(trimmed)) {
    return '';
  }

  // If missing protocol, prepend https://
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = 'https://' + trimmed;
  }

  return trimmed;
}

export function isValidUrl(input) {
  if (!input) return false;
  const normalized = normalizeUrl(input);
  if (!normalized) return false;

  try {
    const url = new URL(normalized);
    // Ensure protocol is http or https
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return false;
    }
    // Ensure hostname has at least one dot or is localhost
    if (!url.hostname.includes('.') && url.hostname !== 'localhost') {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

export function extractDomain(input) {
  if (!input) return '';
  const normalized = normalizeUrl(input);
  if (!normalized) return input;
  try {
    const url = new URL(normalized);
    return url.hostname.replace(/^www\./i, '');
  } catch (e) {
    return input.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0];
  }
}
