const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const SupplierSchema = new Schema({
    supplierName:{
        type: String,
        required: true
    },
    supplierDate:{
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

module.exports = Supplier = mongoose.model('supplier', SupplierSchema, 'suppliers');
