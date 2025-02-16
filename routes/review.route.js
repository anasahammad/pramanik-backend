const express = require('express');
const { createReview, getReviews, getAlReviews, updateReviewStatus, deleteReviewByAdmin } = require('../controllers/review.controller');
const { auth, adminAuth } = require('../middlewares/auth');
// 

const router = express.Router();

// Category routes
router.post('/:id', createReview);
router.get('/:id', getReviews);
router.get('/',  getAlReviews);
router.put('/:id', auth, adminAuth, updateReviewStatus);
router.delete('/:id', auth, adminAuth, deleteReviewByAdmin);

module.exports = router;