const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;

// gzip compression for static files
app.use(compression());

// // Set limits for different routes - you must install 'express-rate-limit' (npm install express-rate-limit)
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 min
//     max: 100 // maximum number of requests for one IP address in a time
//   });
  
//   // Apply limits to all routes
//   app.use(limiter);

// Setting the build directory for static files
app.use(express.static(path.join(__dirname, 'build'), {
    maxAge: '3d' // Set the maximum cache time to 3 days
}));

// Endpoint for handling GET requests to the root directory
app.get('/', async (req, res) => {
  try {
    // Simple HTML as a response to a request
    res.write('<html><head><title>Simple Node Server</title></head><body><h1>Simple Node Server</h1><p>Loading...</p></body></html>');

    // Load the contents of the index.html file asynchronously
    const indexHtmlContent = await fs.readFile(path.join(__dirname, 'build', 'index.html'), 'utf8');

    // After loading the index.html file, we send it as a response
    res.end(indexHtmlContent);
  } catch (error) {
    console.error('An error occurred while loading the index.html file: ', error);
    res.status(500).send('500 internal server error');
  }
});

// Server start
app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});

// To run the server type 'node app.js'
