const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBrandInput(data){
    let errors = {};

    data.brandName = !isEmpty(data.brandName) ? data.brandName : '';
    data.brandNotes = !isEmpty(data.brandNotes) ? data.brandNotes: '';
    data.category = !isEmpty(data.category) ? data.category: '';

    if(Validator.isEmpty(data.brandName)){
        errors.brandName = "Brand Name is required";
    }

    if(Validator.isEmpty(data.brandNotes)){
        errors.brandNotes = "Brand Notes is required";
    }

    if(Validator.isEmpty(data.category)){
        errors.category = "Category is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }


};
