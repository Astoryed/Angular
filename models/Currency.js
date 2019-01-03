const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const CurrencySchema = new Schema({
    currencyName:{
        type: String,
        required: true
    },
    currencyRate:{
        type: String,
        required: true
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

module.exports = Currency = mongoose.model('currency', CurrencySchema, 'currencies');
