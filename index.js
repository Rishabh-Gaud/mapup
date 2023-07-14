// Step 4: Import modules and create an Express application

const express = require('express');
const turf = require('@turf/turf');
const app = express();
const multer = require('multer');
const upload = multer(); // Create a multer instance
const port = 3000; // Choose an appropriate port number

// Step 5: Define authentication middleware

const authMiddleware = (req, res, next) => {
    next(); // Proceed to the next middleware or route handlergit
};

// Step 6: Create the API endpoint

app.use(express.json()); // Parse JSON request bodies
app.use(upload.any()); // Use multer to handle multipart/form-data
app.get('/intersections', authMiddleware, (req, res) => {
    return res.status(200).json({message: "yes everything is ready"});
})
app.post('/intersections', authMiddleware, (req, res) => {
  const linestring = req.body.linestring; // Assuming the GeoJSON linestring is passed in the request body
  const lines = req.body.lines; // Assuming the array of 50 lines is passed in the request body
 console.log("line >>>>>>>>>>>", lines);
 console.log("linestrig >>>>>>>", linestring);

  // Validate the request body
  if (!linestring || !lines) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    // Parse the GeoJSON linestring
    const parsedLinestring = turf.lineString(linestring.coordinates);
    // Perform the intersection check using Turf.js
    const intersectingLines = lines.filter((line) => {
      const parsedLine = turf.lineString(line.line.coordinates);
      const intersection = turf.lineIntersect(parsedLine, parsedLinestring);
        console.log("intersection >>>>>>>>>>>>>>>>> main data", intersection);
      return intersection.features.length > 0;
    });

    res.json(intersectingLines);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Step 7: Start the Express application

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
