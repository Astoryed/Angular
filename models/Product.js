const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ProductSchema = new Schema({
    barCode:{
        type: Number,
        required: true
    },
    cartonCode:{
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    productCode:{
        type: String,
        required: true
    },
    manufacturer:{
        type: String,
        required: true
    },
    minQty:{
        type: Number,
        required:true
    },
    maxQty:{
        type: Number,
        required:true
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

module.exports = Product = mongoose.model('product', ProductSchema, 'products');
