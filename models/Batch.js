const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const BatchSchema = new Schema({
    batchNumber:{
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

module.exports = Batch = mongoose.model('batch', BatchSchema, 'batches');
