const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const FrieghtSchema = new Schema({
  invoiceNumber:{
    type: String,
    required: true
  },
  client:{
    type: String,
    required: true
  },
  finalDestination: {
    type: String,
    required: true,
  },
  blNumber:{
    type: String,
    required: true,
  },
  mblNumber:{
    type: String,
    required: true,
  },
  invoiceDate:{
    type: String,
    required: true,
  },
  container: [
    {
      containerNumber: {
        type: String,
        required: true,
      },
      price:{
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    }
  ],
    containerPrice: {
        type: Number,
        required: true,
    },
    expensePrice:{
        type: String,
        required: true,
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    avgPrice:{
        type: Number,
        required: true,
    },
    totalProductPiece:{
        type: String,
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

module.exports = Frieght = mongoose.model('frieght', FrieghtSchema, 'frieghtes');
