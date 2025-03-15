const express = require('express');
const bodyParser = require('body-parser');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Initialize Google Cloud Text-to-Speech client
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: 'key.json', // Path to your Google Cloud key file
});

// POST endpoint to handle Text-to-Speech requests
app.post('/tts', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send('Error: Text is required.');
  }

  // Prepare the TTS request
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    // Perform the Text-to-Speech request
    const [response] = await client.synthesizeSpeech(request);

    // Save the audio file
    const outputFilePath = 'output.mp3';
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFilePath, response.audioContent, 'binary');
    console.log('Audio content written to file:', outputFilePath);

    // Send the audio file as a response
    res.download(outputFilePath);
  } catch (error) {
    console.error('Error during TTS conversion:', error);
    res.status(500).send('Error processing text-to-speech.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Text-to-Speech API is running at http://localhost:${port}`);
});
