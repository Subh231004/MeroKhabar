const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['politics', 'sports', 'technology', 'entertainment', 'business', 'health']
    },
    imageUrl: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    }
});

module.exports = mongoose.model('News', NewsSchema); 