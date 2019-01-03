const express = require('express');
const router = express.Router();
const Inventory = require('../../models/Inventory');
const Frieght = require('../../models/Frieght');
const Currency = require('../../models/Currency');
const Product = require('../../models/Product');
const Unit = require('../../models/Unit');


//Load Input Validation
const validateInventoryInput = require('../../validation/inventory');


router.get('/test', (req, res) => res.json({msg: "Inventory Works"}));


router.get('/read', (req, res, next) => {

  Inventory.find({}, (err, inventories) => {
    if (err)
      res.status(500).json({errmsg: err});

    res.status(200).json({msg: inventories})
  })

});


router.get('/readFrieght', (req, res, next) => {

  Frieght.find({}, (err, frieghtes) => {
    if (err)
      res.status(500).json({errmsg: err});

    res.status(200).json({msg: frieghtes})
  })
});



router.get('/readCurrency', (req, res, next) => {

  Currency.find({}, (err, currencies) => {
    if (err)
      res.status(500).json({errmsg: err});

    res.status(200).json({msg: currencies})
  })
});



router.get('/readProduct', (req, res, next) => {

    Product.find({}, (err, products) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: products})
    })
});


router.get('/readUnit', (req, res, next) => {

    Unit.find({}, (err, units) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: units})
    })
});


router.post('/create', (req, res, next) => {
    // const {errors, isValid} = validateInventoryInput(req.body);
    //
    // //Check Validation
    // if(!isValid){
    //     return res.status(400).json(errors);
    // }
  const newInventory = new Inventory({
    inventoryNumber: req.body.inventoryNumber,
    containerNumber: req.body.containerNumber,
    batchNumber:req.body.batchNumber,
    inventoryDate: req.body.inventoryDate,
    productCode:req.body.productCode,
    barCode: req.body.barCode,
    avgPrice: req.body.avgPrice,
    size: req.body.size,
    items: req.body.items,
    totalCarton: req.body.totalCarton,
    totalDzn: req.body.totalDzn,
    // totalPriceDollar: req.body.totalPriceDollar,
    totalPriceRs: req.body.totalPriceRs,
    totalPieces: req.body.totalPieces,
    notes: req.body.notes,
    status: req.body.status,
    created: req.body.created,
    updated: req.body.updated
  });

  newInventory.save((err, inventories) =>{
    if(err)
      res.status(500).json({errmsg: err});

    res.status(200).json({msg: inventories})
  })
});


router.put('/updateInventory', (req, res, next) => {
  Inventory.findById(req.body._id,(err, inventory) => {
    if(err)
      res.status(500).json({errmsg: err});
    inventory.inventoryNumber = req.body.inventoryNumber;
    inventory.containerNumber = req.body.containerNumber;
    inventory.batchNumber = req.body.batchNumber;
    inventory.inventoryDate = req.body.inventoryDate;
    inventory.productCode = req.body.productCode;
    inventory.barCode = req.body.barCode;
    inventory.avgPrice = req.body.avgPrice;
    inventory.size = req.body.size;
    inventory.items = req.body.items;
    inventory.totalCarton = req.body.totalCarton;
    inventory.totalDzn = req.body.totalDzn;
    // inventory.totalPriceDollar = req.body.totalPriceDollar;
    inventory.totalPriceRs = req.body.totalPriceRs;
    inventory.totalPieces = req.body.totalPieces;
    inventory.notes = req.body.notes;
    inventory.status = req.body.status;
    inventory.created = req.body.created;
    inventory.updated = req.body.updated;

    inventory.save((err, inventory) =>{
      if(err)
        res.status(500).json({errmsg: err});

      res.status(200).json({msg: inventory})
    })
  })
});

router.put('/deleteInventory/:id', (req, res, next) => {
  Inventory.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, inventory) => {
    if(err)
      res.status(500).json({errmsg: err});

    res.status(200).json({msg: inventory})
  })
});

module.exports = router;
