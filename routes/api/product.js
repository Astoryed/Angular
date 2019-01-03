const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Brand = require('../../models/Brand');


//Load Input Validation
const validateProductInput = require('../../validation/product');


router.get('/test', (req, res) => res.json({msg: "Products Works"}));


router.post('/create', (req, res, next) => {
    const {errors, isValid} = validateProductInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    const newProduct = new Product({
        barCode: req.body.barCode,
        cartonCode: req.body.cartonCode,
        productName: req.body.productName,
        productCode: req.body.productCode,
        manufacturer: req.body.manufacturer,
        minQty: req.body.minQty,
        maxQty: req.body.maxQty,
        status: req.body.status,
        created: req.body.created,
        updated: req.body.updated
    });

    newProduct.save((err, products) =>{
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: products})
    })
});


router.get('/read', (req, res, next) => {

    Product.find({}, (err, products) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: products})
    })
});


router.put('/updateProduct', (req, res, next) => {
    Product.findById(req.body._id,(err, product) => {
        if(err)
            res.status(500).json({errmsg: err});
        product.barCode = req.body.barCode;
        product.cartonCode = req.body.cartonCode;
        product.productName = req.body.productName;
        product.productCode = req.body.productCode;
        product.manufacturer = req.body.manufacturer;
        product.minQty = req.body.minQty;
        product.maxQty = req.body.maxQty;
        product.status = req.body.status;
        product.created = req.body.created;
        product.updated = req.body.updated;

        product.save((err, product) =>{
            if(err)
                res.status(500).json({errmsg: err});

            res.status(200).json({msg: product})
        })
    })
});


router.put('/deleteProduct/:id', (req, res, next) => {
    Product.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, product) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: product})
    })
});


//Delete From Database

// router.delete('/deleteProduct/:id', (req, res, next) => {
//     Product.findOneAndRemove({_id: req.params.id},(err, product) => {
//         if(err)
//             res.status(500).json({errmsg: err});
//
//         res.status(200).json({msg: product})
//     })
// });


router.get('/readBrand', (req, res, next) => {

    Brand.find({}, (err, brands) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: brands})
    })
});

module.exports = router;