const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/subscribe', (req, res) => {
  const { email } = req.body;
  console.log(`📧 New subscriber: ${email}`);
  return res.json({ message: `Thanks for subscribing, ${email}! 🎉` });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
