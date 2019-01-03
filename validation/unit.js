const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUnitInput(data){
    let errors = {};

    data.unitName = !isEmpty(data.unitName) ? data.unitName : '';
    data.quantity = !isEmpty(data.quantity) ? data.quantity: '';


    if(Validator.isEmpty(data.unitName)){
        errors.unitName = "Unit Name is required";
    }

    if(Validator.isEmpty(data.quantity)){
        errors.quantity = "Quantity is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }


};
