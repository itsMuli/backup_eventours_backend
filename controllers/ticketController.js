const Ticket = require('../models/Ticket');

const jwt = require('jsonwebtoken');

// @desc    Create a new support ticket
// @route   POST /api/tickets
// @access  Public
const createTicket = async (req, res) => {
    const { name, email, message, userId } = req.body;
    let finalUserId = userId;

    // Optional: Get user from token if available
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.id) {
                finalUserId = decoded.id;
            }
        } catch (error) {
            console.error('Token verification in ticket creation failed:', error.message);
        }
    }

    try {
        const ticket = await Ticket.create({
            user: finalUserId || null,
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

