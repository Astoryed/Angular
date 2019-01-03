const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategoryInput(data){
    let errors = {};

    data.categoryName = !isEmpty(data.categoryName) ? data.categoryName : '';
    data.categoryNotes = !isEmpty(data.categoryNotes) ? data.categoryNotes: '';


    if(Validator.isEmpty(data.categoryName)){
        errors.categoryName = "category Name is required";
    }

    if(Validator.isEmpty(data.categoryNotes)){
        errors.categoryNotes = "Category Notes is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }


};
