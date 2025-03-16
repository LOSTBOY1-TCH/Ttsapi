const express = require('express');
const router = express.Router();
const ttsService = require('./ttsService'); // Import the TTS service

// Endpoint for text-to-audio conversion
router.post('/convert', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).send({ error: 'Text is required' });
    }

    const audioFile = await ttsService.convertTextToAudio(text); // Call the service
    res.status(200).send({ message: 'Audio file generated successfully', audioFile });
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate audio', details: error.message });
  }
});

module.exports = router;
