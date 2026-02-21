const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');

router.route('/')
    .get(getTours)
    .post(protect, admin, createTour);

router.route('/:id')
    .get(getTourById)
    .put(protect, admin, updateTour)
    .delete(protect, admin, deleteTour);

module.exports = router;
