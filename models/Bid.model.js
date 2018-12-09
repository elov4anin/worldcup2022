const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    birthday: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('bids', bidSchema);