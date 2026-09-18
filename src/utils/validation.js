export function validateEmail(email) {
  if (!email || !email.trim()) return true; // Optional if empty, but if provided must match
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validatePhone(phone) {
  if (!phone || !phone.trim()) return false;
  // Allow numbers, spaces, plus, hyphens, min 6 digits
  const digitsOnly = phone.replace(/[^0-9]/g, '');
  return digitsOnly.length >= 7;
}

export function validateHex(hex) {
  if (!hex) return false;
  return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex.trim());
}

export function validateClientInfo(client) {
  const errors = {};

  if (!client.brandName || !client.brandName.trim()) {
    errors.brandName = 'Brand or company name is required.';
  }

  if (!client.contactPerson || !client.contactPerson.trim()) {
    errors.contactPerson = 'Contact person name is required.';
  }

  if (!client.whatsapp || !client.whatsapp.trim()) {
    errors.whatsapp = 'WhatsApp number is required for design delivery.';
  } else if (!validatePhone(client.whatsapp)) {
    errors.whatsapp = 'Please enter a valid phone/WhatsApp number.';
  }

  if (client.email && client.email.trim() && !validateEmail(client.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!client.websitePurpose || !client.websitePurpose.trim()) {
    errors.websitePurpose = 'Please select a website purpose.';
  } else if (client.websitePurpose === 'Other' && (!client.customPurpose || !client.customPurpose.trim())) {
    errors.customPurpose = 'Please specify your custom website purpose.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
