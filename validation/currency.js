const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCurrencyInput(data){
    let errors = {};

    data.currencyName = !isEmpty(data.currencyName) ? data.currencyName : '';
    data.currencyRate = !isEmpty(data.currencyRate) ? data.currencyRate : '';


    if(Validator.isEmpty(data.currencyName)){
        errors.currencyName = "Currency Name is required";
    }

    if(Validator.isEmpty(data.currencyRate)){
        errors.currencyRate  = "Currency Rate is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }


};
