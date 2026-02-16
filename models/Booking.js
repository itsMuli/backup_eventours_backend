const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tour'
    },
    bookingDate: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        default: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    cancellationReason: {
        type: String,
        required: false
    }


}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
