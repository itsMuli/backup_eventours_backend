const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    destTitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    fees: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String, // e.g., 'popular', 'package'
        default: 'package'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tour', tourSchema);
