// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const sequelize = require('./config/db');
// const profileRoutes = require('./routes/profile');


// const app = express();

// // 🔴 1️⃣ CORS FIRST
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// // 🔴 2️⃣ Body parser
// app.use(express.json());

// // 🔴 3️⃣ Routes AFTER CORS
// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);
// app.use('/profile', profileRoutes);
// const messRoutes = require('./routes/messRoutes');
// app.use('/messes', messRoutes);

// // 🔴 4️⃣ Models
// const Mess = require('./models/Mess');

// const PORT = process.env.PORT || 4000;

// // 🔴 5️⃣ DB + server start
// sequelize.authenticate()
//   .then(() => {
//     console.log('✅ PostgreSQL connected via Sequelize');
//     return sequelize.sync({ alter: true });

//   })
//   .then(() => {
//     console.log('✅ Models synced to database');
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ Database connection failed:', err.message);
//   });



// ===========================
// neon DB connection
// ==========================

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const messRoutes = require('./routes/messRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/messes', messRoutes);

const PORT = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL connected via NeonDB');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err.message);
  });
