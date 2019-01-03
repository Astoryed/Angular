const express = require('express');
const router = express.Router();
const Supplier = require('../../models/Supplier');

//Load Input Validation
// const validateBatchInput = require('../../validation/batch');


router.get('/test', (req, res) => res.json({msg: "Supplier Works"}));


router.get('/read', (req, res, next) => {

    Supplier.find({}, (err, suppliers) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: suppliers})
    })
});

router.post('/create', (req, res, next) => {
    // const {errors, isValid} = validateBatchInput(req.body);
    //
    // //Check Validation
    // if(!isValid){
    //     return res.status(400).json(errors);
    // }
    const newSupplier = new Supplier({
        supplierName: req.body.supplierName,
        supplierDate: req.body.supplierDate,
        contact: req.body.contact,
        status: req.body.status,
        created: req.body.created,
        updated: req.body.updated
    });

    newSupplier.save((err, suppliers) =>{
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: suppliers})
    })
});


router.put('/updateSupplier', (req, res, next) => {
    Supplier.findById(req.body._id,(err, supplier) => {
        if(err)
            res.status(500).json({errmsg: err});
        supplier.supplierName = req.body.supplierName;
        supplier.supplierDate = req.body.supplierDate;
        supplier.contact = req.body.contact;
        supplier.status = req.body.status;
        supplier.created = req.body.created;
        supplier.updated = req.body.updated;

        supplier.save((err, supplier) =>{
            if(err)
                res.status(500).json({errmsg: err});

            res.status(200).json({msg: supplier})
        })
    })
});

router.put('/deleteSupplier/:id', (req, res, next) => {
    Supplier.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, supplier) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: supplier})
    })
});

//Delete From Database
// router.delete('/deleteBatch/:id', (req, res, next) => {
//     Batch.findOneAndRemove({_id: req.params.id},(err, batch) => {
//         if(err)
//             res.status(500).json({errmsg: err});
//
//         res.status(200).json({msg: batch})
//     })
// });





module.exports = router;
