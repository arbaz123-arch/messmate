const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db')
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

const cors = require('cors');

// app.use(cors()); // 👈 MOST IMPORTANT LINE
app.use(cors({
  origin: 'http://localhost:3000'
}));


const PORT = process.env.PORT || 4000;

// ✅ Import model (IMPORTANT for sync)
const Mess = require('./models/Mess');

// ✅ Import routes
const messRoutes = require('./routes/messRoutes');
app.use('/messes', messRoutes);

// ✅ DB connection + sync + server start
sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL connected via Sequelize');
    return sequelize.sync(); // table create karega agar nahi hai
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
