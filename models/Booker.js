const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const BookerSchema = new Schema({
    bookerName:{
        type: String,
        required: true
    },
    bookingDate:{
        type: String,
        required: true
    },
    contact:{
        type: Number,
        required: true,
    },
    status:{
        type: Number,
        default: 1,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    },
    updated:{
        type: Date,
        default: Date.now
    },
});

module.exports = Booker = mongoose.model('booker', BookerSchema, 'bookers');
