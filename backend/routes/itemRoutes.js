const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper for waiting between retries
const delay = (ms) => new Promise(res => setTimeout(res, ms));

router.post('/add', async (req, res) => {
    const { name, category, quantity } = req.body;

    // 1. START WITH SENSIBLE DEFAULTS
    let carbonScore = 50;
    let ecoTip = "Sustainability data syncing... (AI currently in standby mode)";

    // 2. DEFINE FALLBACK MODELS (2.5-lite is currently the most stable for free tier)
    const modelOptions = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-2.0-flash"];

    console.log(`📡 Commencing resilient audit for: ${name}`);

    for (const modelName of modelOptions) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const prompt = `Perform a sustainability audit for ${name} (${category}). Return ONLY JSON: {"score": number, "tip": "one short sentence"}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            if (text) {
                // Find JSON inside potential markdown backticks
                const jsonMatch = text.match(/\{.*\}/s);
                const data = JSON.parse(jsonMatch ? jsonMatch[0] : text);

                carbonScore = data.score || 50;
                ecoTip = data.tip || "Maintain regularly to extend life.";
                console.log(`✅ Success with model: ${modelName}`);
                break; // Exit loop on first success!
            }
        } catch (err) {
            console.warn(`⚠️ Model ${modelName} failed: ${err.message.slice(0, 50)}...`);
            if (err.message.includes("429")) await delay(2000); // Wait if rate-limited
            continue; // Try the next model in the list
        }
    }

    // 3. THE "SAFE SAVE" - Always save to DB so UI works
    try {
        const newItem = new Item({ name, quantity, category, carbonScore, ecoTip });
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (dbErr) {
        res.status(500).json({ error: "Database Sync Error" });
    }
});

// Standard Fetching & Deletion
router.get('/all', async (req, res) => {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
});

router.delete('/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json("Deleted");
});

module.exports = router;