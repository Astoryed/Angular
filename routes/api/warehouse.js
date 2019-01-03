const express = require('express');
const router = express.Router();
const Warehouse = require('../../models/Warehouse');
const City = require('../../models/City');

//Load Input Validation
const validateWarehouseInput = require('../../validation/warehouse');


router.get('/test', (req, res) => res.json({msg: "Warehouse Works"}));


router.get('/read', (req, res, next) => {

    Warehouse.find({}, (err, warehouses) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: warehouses})
    })
});

router.post('/create', (req, res, next) => {
    const {errors, isValid} = validateWarehouseInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    const newWarehouse = new Warehouse({
        warehouseName: req.body.warehouseName,
        warehouseCode: req.body.warehouseCode,
        warehouseLocation: req.body.warehouseLocation,
        status: req.body.status,
        created: req.body.created,
        updated: req.body.updated
    });

    newWarehouse.save((err, warehouses) =>{
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: warehouses})
    })
});


router.put('/updateWarehouse', (req, res, next) => {
    Warehouse.findById(req.body._id,(err, warehouse) => {
        if(err)
            res.status(500).json({errmsg: err});
        warehouse.warehouseName = req.body.warehouseName;
        warehouse.warehouseCode = req.body.warehouseCode;
        warehouse.warehouseLocation = req.body.warehouseLocation;
        warehouse.status= req.body.status;
        warehouse.created = req.body.created;
        warehouse.updated = req.body.updated;

        warehouse.save((err, warehouse) =>{
            if(err)
                res.status(500).json({errmsg: err});

            res.status(200).json({msg: warehouse})
        })
    })
});

router.put('/deleteWarehouse/:id', (req, res, next) => {
    Warehouse.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, warehouse) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: warehouse})
    })
});

//Delete From Database
// router.delete('/deleteWarehouse/:id', (req, res, next) => {
//     Warehouse.findOneAndRemove({_id: req.params.id},(err, warehouse) => {
//         if(err)
//             res.status(500).json({errmsg: err});
//
//         res.status(200).json({msg: warehouse})
//     })
// });


router.get('/readCity', (req, res, next) => {
    City.find({}, (err, cities) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: cities})
    })
});




module.exports = router;
