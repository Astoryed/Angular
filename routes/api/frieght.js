const express = require('express');
const router = express.Router();
const Frieght = require('../../models/Frieght');

//Load Input Validation
const validateFrieghtInput = require('../../validation/frieght');


router.get('/test', (req, res) => res.json({msg: "Frieght Works"}));


router.get('/read', (req, res, next) => {

    Frieght.find({}, (err, frieghtes) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: frieghtes})
    })
});

router.post('/create', (req, res, next) => {
    // const {errors, isValid} = validateFrieghtInput(req.body);
    //
    // //Check Validation
    // if(!isValid){
    //     return res.status(400).json(errors);
    // }
    const newFrieght = new Frieght({
        invoiceNumber: req.body.invoiceNumber,
        client: req.body.client,
        finalDestination:req.body.finalDestination,
        blNumber: req.body.blNumber,
        mblNumber:req.body.mblNumber,
        invoiceDate: req.body.invoiceDate,
        container: req.body.container,
        containerPrice: req.body.containerPrice,
        expensePrice:req.body.expensePrice,
        totalPrice: req.body.totalPrice,
        avgPrice: req.body.avgPrice,
        totalProductPiece: req.body.totalProductPiece,
        notes: req.body.notes,
        status: req.body.status,
        created: req.body.created,
        updated: req.body.updated
    });

    newFrieght.save((err, frightes) =>{
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: frightes})
    })
});


router.put('/updateFrieght', (req, res, next) => {
    Frieght.findById(req.body._id,(err, frieght) => {
        if(err)
            res.status(500).json({errmsg: err});
            frieght.invoiceNumber = req.body.invoiceNumber;
            frieght.client = req.body.client;
            frieght.finalDestination = req.body.finalDestination;
            frieght.blNumber = req.body.blNumber;
            frieght.mblNumber = req.body.mblNumber;
            frieght.invoiceDate = req.body.invoiceDate;
            frieght.container = req.body.container;
            frieght.containerPrice = req.body.containerPrice;
            frieght.expensePrice = req.body.expensePrice;
            frieght.totalPrice = req.body.totalPrice;
            frieght.avgPrice = req.body.avgPrice,
            frieght.totalProductPiece = req.body.totalProductPiece;
            frieght.notes = req.body.notes;
            frieght.status = req.body.status;
            frieght.created = req.body.created;
            frieght.updated = req.body.updated;

        frieght.save((err, frieght) =>{
            if(err)
                res.status(500).json({errmsg: err});

            res.status(200).json({msg: frieght})
        })
    })
});

router.put('/deleteFrieght/:id', (req, res, next) => {
    Frieght.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, frieght) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: frieght})
    })
});

module.exports = router;
