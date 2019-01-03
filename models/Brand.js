const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const BrandSchema = new Schema({
    brandName:{
        type: String,
        required: true
    },
    brandNotes:{
        type: String,
        required: true
    },
    status:{
        type: Number,
        default: 1,
        required: true
    },
    category:{
        type: String,
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

module.exports = Brand = mongoose.model('brand', BrandSchema, 'brands');
