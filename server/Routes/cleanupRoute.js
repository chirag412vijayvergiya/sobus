const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log('api key :- ', apiKey);
  console.log('process.env.CLEANUP_API_KEY :- ', process.env.CLEANUP_API_KEY);
  if (apiKey !== process.env.CLEANUP_API_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};

router.get('/', verifyApiKey, async (req, res) => {
  try {
    const FiveHoursAgo = new Date(Date.now() - 5 * 60 * 60 * 1000);
    const deletedUsers = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: FiveHoursAgo },
    });

    console.log(`✅ Deleted ${deletedUsers.deletedCount} unverified users.`);
    res.status(200).json({
      message: `Deleted ${deletedUsers.deletedCount} unverified users.`,
    });
  } catch (error) {
    console.error('❌ Error deleting unverified users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
