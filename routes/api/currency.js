const express = require('express');
const router = express.Router();
const Currency = require('../../models/Currency');


//Load Input Validation
const validateCurrencyInput = require('../../validation/currency');


router.get('/test', (req, res) => res.json({msg: "Currency Works"}));

router.post('/create', (req, res, next) => {
    const {errors, isValid} = validateCurrencyInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const newCurrency = new Currency({

        currencyName: req.body.currencyName,
        currencyRate: req.body.currencyRate,
        status: req.body.status,
        created: req.body.created,
        updated: req.body.updated
    });

    newCurrency.save((err, currencies) =>{
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: currencies})
    })
});

router.get('/read', (req, res, next) => {

    Currency.find({}, (err, currencies) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: currencies})
    })
});



router.put('/updateCurrency', (req, res, next) => {
    Currency.findById(req.body._id,(err, currency) => {
        if(err)
            res.status(500).json({errmsg: err});
        currency.currencyName = req.body.currencyName;
        currency.currencyRate = req.body.currencyRate;
        currency.status = req.body.status;
        currency.created = req.body.created;
        currency.updated = req.body.updated;

        currency.save((err, currency) =>{
            if(err)
                res.status(500).json({errmsg: err});

            res.status(200).json({msg: currency})
        })
    })
});


router.put('/deleteCurrency/:id', (req, res, next) => {
    Currency.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, currency) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: currency})
    })
});


//Delete From Database
// router.delete('/deleteCurrency/:id', (req, res, next) => {
//     Currency.findOneAndRemove({_id: req.params.id},(err, currency) => {
//         if(err)
//             res.status(500).json({errmsg: err});
//
//         res.status(200).json({msg: currency})
//     })
// });


module.exports = router;