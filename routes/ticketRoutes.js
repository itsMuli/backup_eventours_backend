const express = require('express');
const router = express.Router();
const { createTicket, getMyTickets, getTickets } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
    .get(protect, admin, getTickets)
    .post(createTicket);

router.get('/mytickets', protect, getMyTickets);



module.exports = router;
