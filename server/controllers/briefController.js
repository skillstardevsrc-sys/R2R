// In-memory cache for briefs (or connects to MongoDB if MONGODB_URI is provided)
const briefsStore = new Map();

export async function createDesignBrief(req, res) {
  try {
    const { client, direction, colors, typography, theme, ui, hero, navigation, animation, references, avoid, additionalNotes } = req.body;

    // Server-side validation
    if (!client?.brandName?.trim()) {
      return res.status(400).json({ success: false, error: 'Brand name is required.' });
    }
    if (!client?.contactPerson?.trim()) {
      return res.status(400).json({ success: false, error: 'Contact person is required.' });
    }
    if (!client?.whatsapp?.trim()) {
      return res.status(400).json({ success: false, error: 'WhatsApp number is required.' });
    }

    const briefId = `brief_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const savedRecord = {
      id: briefId,
      createdAt: new Date().toISOString(),
      client,
      direction,
      colors,
      typography,
      theme,
      ui,
      hero,
      navigation,
      animation,
      references: (references || []).slice(0, 5),
      avoid: avoid || [],
      additionalNotes: (additionalNotes || '').slice(0, 2000)
    };

    briefsStore.set(briefId, savedRecord);

    return res.status(201).json({
      success: true,
      briefId,
      message: 'Design brief saved successfully.',
      data: savedRecord
    });
  } catch (err) {
    console.error('Error saving brief:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while saving the design brief.'
    });
  }
}

export async function getDesignBrief(req, res) {
  try {
    const { id } = req.params;
    const record = briefsStore.get(id);

    if (!record) {
      return res.status(404).json({ success: false, error: 'Design brief not found.' });
    }

    return res.status(200).json({ success: true, data: record });
  } catch (err) {
    console.error('Error retrieving brief:', err);
    return res.status(500).json({ success: false, error: 'Error retrieving design brief.' });
  }
}
