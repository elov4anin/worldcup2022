const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidSchema = new Schema({
    name: {
        type: String
    },
    birthday: {
        type: Date
    },
    email: {
        type: String,
        unique: true
    },
    country: {
        type: String
    },
});

module.exports = mongoose.model('bids', bidSchema);