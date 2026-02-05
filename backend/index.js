const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const itemRoutes = require('./routes/itemRoutes');

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// Using your verified connection string
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://EchoTracker:EcoTrack2026@cluster0.rncwayv.mongodb.net/EcoTrack?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('🚀 SUCCESS: System Heartbeat Detected');
        console.log('✅ DATABASE CONNECTED: Neural Registry Online');
    })
    .catch((err) => {
        console.error('❌ CONNECTION FAILURE:', err.message);
    });

// --- ROUTES ---
app.use('/api/items', itemRoutes);

// Root health check
app.get('/', (req, res) => {
    res.send('🍃 EcoTrack AI Backend is live and auditing.');
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`📡 Broadcast started on port ${PORT}`);
    console.log(`🧠 AI Engine set to: gemini-2.0-flash`);
});