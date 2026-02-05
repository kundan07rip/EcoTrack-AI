const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const itemRoutes = require('./routes/itemRoutes');
const app = express();

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"]
}));

// --- DATABASE CONNECTION ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ DATABASE CONNECTED: Neural Registry Online'))
    .catch((err) => console.error('❌ CONNECTION FAILURE:', err.message));

// --- ROUTES ---
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
    res.send('🍃 EcoTrack AI Backend is live and auditing.');
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`📡 Broadcast started on port ${PORT}`);
});