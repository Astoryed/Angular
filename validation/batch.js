const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBatchInput(data){
    let errors = {};

    data.batchNumber = !isEmpty(data.batchNumber) ? data.batchNumber : '';

    if(Validator.isEmpty(data.batchNumber)){
        errors.batchNumber = "Batch Number is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }


};
