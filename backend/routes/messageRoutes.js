const express = require('express');
const router = express.Router();
const {
  submitMessage,
  getMessages,
  markAsRead,
  deleteMessage
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(submitMessage)
  .get(protect, getMessages);

router.route('/:id').delete(protect, deleteMessage);
router.route('/:id/read').put(protect, markAsRead);

module.exports = router;
