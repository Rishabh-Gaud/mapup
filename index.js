// Step 4: Import modules and create an Express application

const express = require('express');
const turf = require('@turf/turf');
const app = express();
const multer = require('multer');
const upload = multer(); // Create a multer instance
const port = 3000; // Choose an appropriate port number

// Step 5: Define authentication middleware

const authMiddleware = (req, res, next) => {
    const securityHeader = req.headers['security'];
  
    if (securityHeader === 'mapup') {
      next();
    } else {
      res.status(403).json({ error: 'Access Forbidden' });
    }
  };

// Step 6: Create the API endpoint

app.use(express.json()); // Parse JSON request bodies
app.use(upload.any()); // Use multer to handle multipart/form-data
app.get('/intersections', authMiddleware, (req, res) => {
    return res.status(200).json({message: "yes everything is ready"});
})
app.post('/intersections', authMiddleware, (req, res) => {
    const linestringFile = req.files.find(file => file.fieldname === 'linestring');
    const linesFile = req.files.find(file => file.fieldname === 'lines');
    const linestring = JSON.parse(linestringFile.buffer.toString());
    const lines = JSON.parse(linesFile.buffer.toString());

  // Validate the request body
  if (!linestring || !lines) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    // Parse the GeoJSON linestring
    const parsedLinestring = turf.lineString(linestring.coordinates);
    // Perform the intersection check using Turf.js
    const intersectingLines = lines.filter((line) => {
      const parsedLine = turf.lineString(line.line.coordinates);
      const intersection = turf.lineIntersect(parsedLine, parsedLinestring);
      return intersection.features.length > 0;
    });

    res.json(intersectingLines);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Step 7: Start the Express application

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
