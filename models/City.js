const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const CitySchema = new Schema({
    name:{
        type: String,
        required: true
    },

});

module.exports = City = mongoose.model('city', CitySchema, 'cities');
