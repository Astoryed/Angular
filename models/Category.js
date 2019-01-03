const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const CategorySchema = new Schema({
    categoryName:{
        type: String,
        required: true
    },
    categoryNotes:{
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

module.exports = Category = mongoose.model('category', CategorySchema, 'categories');
