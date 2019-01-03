const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userType:{
        type: Number,
        default: 1,
        required: true
    },
    status:{
        type: Number,
        default: 1,
        required: true
    },
    createdBy:{
        type: Number,
        default: 0
    },
    updatedBy:{
        type: Number,
        default: 0
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

module.exports = User = mongoose.model('user', UserSchema, 'users');
