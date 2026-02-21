const express = require('express');
const router = express.Router();
const { addBooking, getMyBookings, updateBooking, deleteBooking, getBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
    .get(protect, admin, getBookings)
    .post(protect, addBooking);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id').put(protect, updateBooking).delete(protect, deleteBooking);


module.exports = router;
