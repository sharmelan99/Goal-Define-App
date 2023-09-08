const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoals,
  putGoals,
  deleteGoals,
} = require('../controllers/goalsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, setGoals);
router.route('/:id').put(protect, putGoals).delete(protect, deleteGoals);

module.exports = router;
