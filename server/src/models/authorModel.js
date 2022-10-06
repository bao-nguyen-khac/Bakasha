const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    portrait: {
        type: String,
        required: true,
    },
    numBooks: {
        type: Number,
        required: true,
        default: 0,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
}, {
    timestamps: true,
});

module.exports = Author = mongoose.model('Author', authorSchema);