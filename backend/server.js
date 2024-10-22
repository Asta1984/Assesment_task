// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// Feature hours mapping
const featureHours = {
  "E-commerce": {
    "Product Listing": 30,
    "Payment Integration": 25,
  },
  "Social Media": {
    "User Profiles": 30,
    "Chat System": 40,
  },
  "Cloud Kitchen": {
    "Menu Display": 25,
    "Online Ordering": 40,
  }
};

// Calculate total cost based on selected features
app.post('/api/calculate-cost', (req, res) => {
  const { category, features } = req.body;
  
  if (!category || !features || features.length === 0) {
    return res.status(400).json({ error: 'Category and at least one feature must be selected.' });
  }

  let totalHours = features.reduce((total, feature) => {
    return total + (featureHours[category][feature] || 0);
  }, 0);

  const hourlyRate = 10;
  const totalCost = totalHours * hourlyRate;

  res.json({ totalCost });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});