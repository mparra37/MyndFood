// server.js
const express = require('express');
const app = express();
const port = 3002;
const { consultar } = require('./memoria'); 

// Body parser middleware to handle JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await consultar(prompt);
        res.json({ message: response });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: error.message });
    }
});

// app.post('/chat', (req, res) => {
//     res.json({ message: "Test response" });
// });



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
