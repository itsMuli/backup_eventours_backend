const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

// @desc    Get admin analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const totalPackages = await Tour.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalTickets = await Ticket.countDocuments();

        const bookings = await Booking.find({});
        const totalRevenue = bookings.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

        // Recent activity
        const recentBookings = await Booking.find({}).sort({ createdAt: -1 }).limit(5).populate('user', 'username').populate('tour', 'destTitle');

        res.json({
            stats: {
                totalBookings,
                totalPackages,
                totalUsers,
                totalTickets,
                totalRevenue
            },
            recentBookings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAnalytics };
