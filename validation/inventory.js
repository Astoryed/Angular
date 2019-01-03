const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateInventoryInput(data){
    let errors = {};

    // data.inventoryNumber = !isEmpty(data.inventoryNumber) ? data.inventoryNumber : '';
    data.containerNumber = !isEmpty(data.containerNumber) ? data.containerNumber : '';
    data.batchNumber = !isEmpty(data.batchNumber) ? data.batchNumber : '';
    data.status = !isEmpty(data.status) ? data.status: '';
    data.inventoryDate = !isEmpty(data.inventoryDate) ? data.inventoryDate: '';
    data.productCode = !isEmpty(data.productCode) ? data.productCode: '';
    data.barCodeName = !isEmpty(data.barCodeName) ? data.barCodeName: '';
    data.avgPrice = !isEmpty(data.avgPrice) ? data.avgPrice: '';
    // data.itemName = !isEmpty(data.itemName) ? data.itemName: '';
    // data.cartonQty = !isEmpty(data.cartonQty) ? data.cartonQty: '';
    // data.dznQty = !isEmpty(data.dznQty) ? data.dznQty: '';
    // data.pieceQty = !isEmpty(data.pieceQty) ? data.pieceQty: '';
    // data.totalPiece = !isEmpty(data.totalPiece) ? data.totalPiece: '';
    // data.currency = !isEmpty(data.currency) ? data.currency: '';
    // data.currencyRate = !isEmpty(data.currencyRate) ? data.currencyRate: '';
    // data.sellingPrice = !isEmpty(data.sellingPrice) ? data.sellingPrice: '';
    // data.totalCarton = !isEmpty(data.totalCarton) ? data.totalCarton: '';
    // data.totalDzn = !isEmpty(data.totalDzn) ? data.totalDzn: '';
    // data.totalPieces = !isEmpty(data.totalPieces) ? data.totalPieces: '';
    // data.totalPriceDollar = !isEmpty(data.totalPriceDollar) ? data.totalPriceDollar: '';
    // data.totalPriceRs = !isEmpty(data.totalPriceRs) ? data.totalPriceRs: '';
    data.notes = !isEmpty(data.notes) ? data.notes: '';


    // if(Validator.isEmpty(data.inventoryNumber )){
    //     errors.inventoryNumber  = "Inventory Number is required";
    // }

    if(Validator.isEmpty(data.containerNumber)){
        errors.containerNumber = "Container Number is required";
    }

    if(Validator.isEmpty(data.batchNumber)){
        errors.batchNumber = "Batch Number is required";
    }

    if(Validator.isEmpty(data.status)){
        errors.status = "Status is required";
    }

    if(Validator.isEmpty(data.inventoryDate)){
        errors.inventoryDate = "Date is required";
    }

    if(Validator.isEmpty(data.productCode)){
        errors.productCode = "Product Code is required";
    }

    if(Validator.isEmpty(data.barCodeName)){
        errors.barCodeName = "Barcode Name is required";
    }

    if(Validator.isEmpty(data.avgPrice)){
        errors.avgPrice = "Average Price is required";
    }

    if(Validator.isEmpty(data.notes)){
        errors.notes = "Notes are required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


};
