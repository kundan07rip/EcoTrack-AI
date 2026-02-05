const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    carbonScore: { type: Number, default: 0 }, // Added for AI Score
    ecoTip: { type: String, default: "" }      // Added for AI Insights
}, { timestamps: true });

// CRITICAL: The variable name here must match the definition above
module.exports = mongoose.model('Item', itemSchema);