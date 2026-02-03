const express = require('express');
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();

// 🔴 1️⃣ CORS FIRST
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// 🔴 2️⃣ Body parser
app.use(express.json());

// 🔴 3️⃣ Routes AFTER CORS
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const messRoutes = require('./routes/messRoutes');
app.use('/messes', messRoutes);

// 🔴 4️⃣ Models
const Mess = require('./models/Mess');

const PORT = process.env.PORT || 4000;

// 🔴 5️⃣ DB + server start
sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL connected via Sequelize');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Models synced to database');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });
