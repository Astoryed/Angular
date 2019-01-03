const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const InventorySchema = new Schema({
    inventoryNumber:{
        type: String,
        required: true
    },
    containerNumber:{
        type: String,
        required: true
    },
    batchNumber:{
        type: String,
        required: true,
    },
    inventoryDate:{
        type: String,
        required: true,
    },
    productCode: {
        type: String,
        required: true,
    },
    barCode: {
        type: String,
        required: true,
    },
    avgPrice:{
        type: String,
        required: true,
    },
  items:[
    {
        itemName:{
            type: String,
            required: true,
        },
        cartonType:{
            type: String,
            required: true,
        },
        cartonQty:{
            type: Number,
            required: true,
        },
        dznQty:{
            type: Number,
            required: true,
        },
        pieceQty:{
            type: Number,
            required: true,
        },
        totalPiece:{
            type: Number,
            required: true,
        },
        currency:{
            type: String,
            required: true,
        },
        currencyRate:{
            type: Number,
            required: true,
        },
        sellingPrice:{
            type: Number,
            required: true,
        },
        expireDate:{
            type: String,
            required: true,
        },
    }
  ],

    totalCarton:{
        type: Number,
        required: true,
    },
    totalDzn:{
        type: Number,
        required: true,
    },
    totalPieces:{
        type: Number,
        required: true,
    },
    // totalPriceDollar:{
    //     type: String,
    //     required: true,
    // },
    totalPriceRs:{
        type: Number,
        required: true,
    },
    notes:{
        type: String,
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

module.exports = Inventory = mongoose.model('inventory', InventorySchema, 'inventories');
