const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UnitSchema = new Schema({
    unitName:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
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

module.exports = Unit = mongoose.model('unit', UnitSchema, 'units');
