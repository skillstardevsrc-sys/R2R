import { sendWhatsAppMessage } from '../services/whatsappService.js';

export async function sendWhatsApp(req, res) {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: phone and message are required.'
      });
    }

    // Check if Cloud API is configured
    if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
      return res.status(503).json({
        success: false,
        fallbackMode: true,
        message: 'WhatsApp Cloud API is not configured on server. Please use client fallback mode.'
      });
    }

    const result = await sendWhatsAppMessage({ to: phone, message });

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('WhatsApp Controller Error:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error while sending WhatsApp message.'
    });
  }
}
