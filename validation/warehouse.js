const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWarehouseInput(data){
    let errors = {};

    data.warehouseName = !isEmpty(data.warehouseName) ? data.warehouseName : '';
    data.warehouseCode = !isEmpty(data.warehouseCode) ? data.warehouseCode : '';
    data.warehouseLocation = !isEmpty(data.warehouseLocation) ? data.warehouseLocation : '';


    if(Validator.isEmpty(data.warehouseName)){
        errors.warehouseName = "Warehouse Name is required";
    }

    if(Validator.isEmpty(data.warehouseCode)){
        errors.warehouseCode = "Warehouse Code is required";
    }

    if(Validator.isEmpty(data.warehouseLocation)){
        errors.warehouseLocation = "Warehouse Location is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


};
