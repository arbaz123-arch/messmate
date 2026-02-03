const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { User } = require('../models');

// GET /profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
