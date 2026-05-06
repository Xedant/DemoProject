const express = require('express');
const app = express();
const PORT = 5003;

app.get('/api/hello', (req, res) => {
    res.json({
        message: 'Hello World',
        server: 'Node.js Express',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.send('Node.js Express Server running. Visit /api/hello for the API.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
