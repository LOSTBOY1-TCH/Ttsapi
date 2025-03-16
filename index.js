const express = require('express');
const bodyParser = require('body-parser');
const ttsRoutes = require('./routes'); // Import routes

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api', ttsRoutes); // Use the defined routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
