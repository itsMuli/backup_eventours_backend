const express = require('express');
const router = express.Router();
const { createTicket, getMyTickets } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createTicket);
router.get('/mytickets', protect, getMyTickets);
router.get('/', (req, res) => res.send('Ticket API is reachable via POST'));



module.exports = router;
