const Ticket = require('../models/Ticket');

// @desc    Create a new support ticket
// @route   POST /api/tickets
// @access  Public
const createTicket = async (req, res) => {
    const { name, email, message, userId } = req.body;

    try {
        const ticket = await Ticket.create({
            user: userId || null,
            name,
            email,
            message
        });

        if (ticket) {
            res.status(201).json({ message: 'Ticket created successfully', ticket });
        } else {
            res.status(400).json({ message: 'Invalid ticket data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user tickets
// @route   GET /api/tickets/mytickets
// @access  Private
const getMyTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user._id });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTicket, getMyTickets };

