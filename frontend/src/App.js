// App.js
import React, { useState } from 'react';
import axios from 'axios';

const categories = ["E-commerce", "Social Media", "Cloud Kitchen"];
const featuresMapping = {
  "E-commerce": ["Product Listing", "Payment Integration"],
  "Social Media": ["User Profiles", "Chat System"],
  "Cloud Kitchen": ["Menu Display", "Online Ordering"],
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedFeatures([]); // Reset features when category changes
  };

  const handleFeatureChange = (e) => {
    const feature = e.target.value;
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const calculateCost = async () => {
    if (!selectedCategory || selectedFeatures.length === 0) {
      alert("Please select a category and at least one feature.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/calculate-cost', { 
        category: selectedCategory, 
        features: selectedFeatures 
      });

      setTotalCost(response.data.totalCost);
    } catch (error) {
      console.error("Error calculating cost:", error);
      alert("Error calculating cost.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">App Cost Calculator</h1>
      
      <div className="mb-4">
        <label className="block mb-2">App Category</label>
        <select value={selectedCategory} onChange={handleCategoryChange} className="border p-2">
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">App Features</label>
        {selectedCategory && featuresMapping[selectedCategory].map(feature => (
          <div key={feature}>
            <input 
              type="checkbox" 
              value={feature} 
              onChange={handleFeatureChange} 
            />
            {feature}
          </div>
        ))}
      </div>

      <button onClick={calculateCost} className="bg-blue-500 text-white px-4 py-2 rounded">
        Calculate Cost
      </button>

      {totalCost > 0 && (
        <div className="mt-4">
          <h2 className="text-xl">Total Cost: ${totalCost}</h2>
        </div>
      )}
    </div>
  );
}

export default App;