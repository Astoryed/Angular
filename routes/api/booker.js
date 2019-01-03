const express = require('express');
const router = express.Router();
const Booker = require('../../models/Booker');

//Load Input Validation
// const validateBatchInput = require('../../validation/batch');


router.get('/test', (req, res) => res.json({msg: "Booker Works"}));


router.get('/read', (req, res, next) => {

    Booker.find({}, (err, bookers) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: bookers})
    })
});

router.post('/create', (req, res, next) => {
    // const {errors, isValid} = validateBatchInput(req.body);
    //
    // //Check Validation
    // if(!isValid){
    //     return res.status(400).json(errors);
    // }
    const newBooker = new Booker({
        bookerName: req.body.bookerName,
        bookingDate: req.body.bookingDate,
        contact: req.body.contact,
        status: req.body.status,
        created: req.body.created,
        updated: req.body.updated
    });

    newBooker.save((err, bookers) =>{
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: bookers})
    })
});


router.put('/updateBooker', (req, res, next) => {
    Booker.findById(req.body._id,(err, booker) => {
        if(err)
            res.status(500).json({errmsg: err});
        booker.bookerName = req.body.bookerName;
        booker.bookingDate = req.body.bookingDate;
        booker.contact = req.body.contact;
        booker.status = req.body.status;
        booker.created = req.body.created;
        booker.updated = req.body.updated;

        booker.save((err, booker) =>{
            if(err)
                res.status(500).json({errmsg: err});

            res.status(200).json({msg: booker})
        })
    })
});

router.put('/deleteBooker/:id', (req, res, next) => {
    Booker.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, booker) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: booker})
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
