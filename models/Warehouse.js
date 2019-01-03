const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const WarehouseSchema = new Schema({
    warehouseName:{
        type: String,
        required: true
    },
    warehouseCode:{
        type: String,
        required: true
    },
    warehouseLocation:{
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

module.exports = Warehouse = mongoose.model('warehouse', WarehouseSchema, 'warehouses');
