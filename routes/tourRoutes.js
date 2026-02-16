const express = require('express');
const router = express.Router();
const { getTours, getTourById, createTour } = require('../controllers/tourController');

router.route('/').get(getTours).post(createTour);
router.route('/:id').get(getTourById);

module.exports = router;
