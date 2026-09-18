/**
 * WhatsApp Cloud API Integration Service
 * Dispatches text messages or document attachments to user's phone via Meta Graph API.
 */
export async function sendWhatsAppMessage({ to, message }) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const version = process.env.WHATSAPP_API_VERSION || 'v19.0';

  if (!token || !phoneNumberId) {
    throw new Error('WhatsApp Cloud API environment variables (WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID) not configured.');
  }

  // Format recipient phone number (remove + and spaces)
  const cleanRecipient = to.replace(/[^0-9]/g, '');

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: cleanRecipient,
    type: 'text',
    text: {
      preview_url: true,
      body: message
    }
  };

  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.error?.message || 'Failed to send WhatsApp message via Meta Cloud API';
    throw new Error(errorMsg);
  }

  return data;
}
