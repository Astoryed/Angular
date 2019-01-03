const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBrandInput(data){
    let errors = {};

    data.barCode = !isEmpty(data.barCode) ? data.barCode : '';
    data.cartonCode = !isEmpty(data.cartonCode) ? data.cartonCode : '';
    data.productName = !isEmpty(data.productName) ? data.productName : '';
    data.productCode = !isEmpty(data.productCode) ? data.productCode : '';
    data.manufacturer = !isEmpty(data.manufacturer) ? data.manufacturer: '';
    data.minQty = !isEmpty(data.minQty) ? data.minQty: '';
    data.maxQty = !isEmpty(data.maxQty) ? data.maxQty: '';


    if(Validator.isEmpty(data.barCode )){
        errors.barCode  = "Barcode is required";
    }

    if(Validator.isEmpty(data.cartonCode)){
        errors.cartonCode = "Carton code is required";
    }

    if(Validator.isEmpty(data.productName)){
        errors.productName = "Product Name is required";
    }

    if(Validator.isEmpty(data.productCode)){
        errors.productCode = "Product Code is required";
    }

    if(Validator.isEmpty(data.manufacturer)){
        errors.manufacturer = "Brand Manufacturer is required";
    }

    if(Validator.isEmpty(data.minQty)){
        errors.minQty = "Minimum Quantity is required";
    }

    if(Validator.isEmpty(data.maxQty)){
        errors.maxQty = "Maximum Quantity is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


};
