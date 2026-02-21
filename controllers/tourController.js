const Tour = require('../models/Tour');

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
const getTours = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category) {
            query.category = category;
        }
        
        const tours = await Tour.find(query);
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
const getTourById = async (req, res) => {
    try {
        const tour = await Tour.findOne({ id: req.params.id });
        if (tour) {
            res.json(tour);
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a tour (Admin only potentially, but public for now to seed)
// @route   POST /api/tours
// @access  Private/Public
const createTour = async (req, res) => {
    try {
        const tour = new Tour(req.body);
        const createdTour = await tour.save();
        res.status(201).json(createdTour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
const updateTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (tour) {
            Object.assign(tour, req.body);
            const updatedTour = await tour.save();
            res.json(updatedTour);
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (tour) {
            await tour.deleteOne();
            res.json({ message: 'Tour removed' });
        } else {
            res.status(404).json({ message: 'Tour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour
};
