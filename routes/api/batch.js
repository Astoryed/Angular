const express = require('express');
const router = express.Router();
const Batch = require('../../models/Batch');

//Load Input Validation
const validateBatchInput = require('../../validation/batch');


router.get('/test', (req, res) => res.json({msg: "Batch Works"}));


router.get('/read', (req, res, next) => {

    Batch.find({}, (err, batches) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: batches})
    })
});

router.post('/create', (req, res, next) => {
    const {errors, isValid} = validateBatchInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    const newBatch = new Batch({
        batchNumber: req.body.batchNumber,
        status: req.body.status,
        created: req.body.created,
        updated: req.body.updated
    });

    newBatch.save((err, batches) =>{
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: batches})
    })
});


router.put('/updateBatch', (req, res, next) => {
    Batch.findById(req.body._id,(err, batch) => {
        if(err)
            res.status(500).json({errmsg: err});
        batch.batchNumber = req.body.batchNumber;
        batch.status = req.body.status;
        batch.created = req.body.created;
        batch.updated = req.body.updated;

        batch.save((err, batch) =>{
            if(err)
                res.status(500).json({errmsg: err});

            res.status(200).json({msg: batch})
        })
    })
});

router.put('/deleteBatch/:id', (req, res, next) => {
    Batch.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, batch) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: batch})
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
