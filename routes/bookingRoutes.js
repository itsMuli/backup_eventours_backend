const express = require('express');
const router = express.Router();
const { addBooking, getMyBookings, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addBooking);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id').put(protect, updateBooking).delete(protect, deleteBooking);


module.exports = router;
