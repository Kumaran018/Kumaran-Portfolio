const express = require('express');
const router = express.Router();
const { loginUser, registerAdmin, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', registerAdmin);
router.get('/profile', protect, getUserProfile);

module.exports = router;
