const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFrieghtInput(data){
    let errors = {};

    data.invoiceNumber = !isEmpty(data.invoiceNumber) ? data.invoiceNumber : '';
    data.client = !isEmpty(data.client) ? data.client : '';
    data.finalDestination = !isEmpty(data.finalDestination) ? data.finalDestination : '';
    data.blNumber = !isEmpty(data.blNumber) ? data.blNumber: '';
    data.mblNumber = !isEmpty(data.mblNumber) ? data.mblNumber: '';
    // data.containerPrice = !isEmpty(data.containerPrice) ? data.containerPrice: '';
    data.invoiceDate = !isEmpty(data.invoiceDate) ? data.invoiceDate: '';
    // data.containerNumber = !isEmpty(data.containerNumber) ? data.containerNumber: '';
    // data.price = !isEmpty(data.price) ? data.price: '';
    // data.size = !isEmpty(data.size) ? data.size: '';
    data.expensePrice = !isEmpty(data.expensePrice) ? data.expensePrice: '';
    data.totalProductPiece = !isEmpty(data.totalProductPiece) ? data.totalProductPiece: '';
    data.notes = !isEmpty(data.notes) ? data.notes: '';


    if(Validator.isEmpty(data.invoiceNumber)){
        errors.invoiceNumber  = "Invoice Number is required";
    }

    if(Validator.isEmpty(data.client)){
        errors.client = "Client Name is required";
    }

    if(Validator.isEmpty(data.finalDestination)){
        errors.finalDestination = "Final Destination is required";
    }

    if(Validator.isEmpty(data.blNumber)){
        errors.blNumber = "BL Number is required";
    }

    if(Validator.isEmpty(data.mblNumber)){
        errors.mblNumber = "MBL Number is required";
    }

    if(Validator.isEmpty(data.invoiceDate)){
        errors.invoiceDate  = "Invoice Date is required";
    }

    // if(Validator.isEmpty(data.containerNumber)){
    //     errors.containerNumber  = "Container Number is required";
    // }
    //
    // if(Validator.isEmpty(data.price)){
    //     errors.price  = "Container Price is required";
    // }
    //
    // if(Validator.isEmpty(data.size)){
    //     errors.size  = "Container Size is required";
    // }

    if(Validator.isEmpty(data.expensePrice)){
        errors.expensePrice = "Expense Price is required";
    }

    if(Validator.isEmpty(data.totalProductPiece)){
        errors.totalProductPiece = "Total Product Piece is required";
    }

    if(Validator.isEmpty(data.notes)){
        errors.notes = "Notes are required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


};
