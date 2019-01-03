const express = require('express');
const router = express.Router();
const Unit = require('../../models/Unit');


//Load Input Validation
const validateUnitInput = require('../../validation/unit');


router.get('/test', (req, res) => res.json({msg: "Unit Works"}));

router.get('/read', (req, res, next) => {

    Unit.find({}, (err, units) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: units})
    })
});


router.post('/create', (req, res, next) => {
    const {errors, isValid} = validateUnitInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const newUnit = new Unit({
        unitName: req.body.unitName,
        quantity: req.body.quantity,
        status: req.body.status,
        created: req.body.created,
        updated: req.body.updated
    });

    newUnit.save((err, units) =>{
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: units})
    })
});


router.put('/updateUnit', (req, res, next) => {
    Unit.findById(req.body._id,(err, unit) => {
        if(err)
            res.status(500).json({errmsg: err});

        unit.unitName = req.body.unitName;
        unit.quantity = req.body.quantity;
        unit.status = req.body.status;
        unit.created = req.body.created;
        unit.updated = req.body.updated;

        unit.save((err, unit) =>{
            if(err)
                res.status(500).json({errmsg: err});

            res.status(200).json({msg: unit})
        })
    })
});


router.put('/deleteUnit/:id', (req, res, next) => {
    Unit.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, unit) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: unit})
    })
});

//Delete From Database
// router.delete('/deleteUnit/:id', (req, res, next) => {
//     Unit.findOneAndRemove({_id: req.params.id},(err, unit) => {
//         if(err)
//             res.status(500).json({errmsg: err});
//
//         res.status(200).json({msg: unit})
//     })
// });

module.exports = router;
