const express = require('express');
const router = express.Router();
const Brand = require('../../models/Brand');
const Category = require('../../models/Category');

//Load Input Validation
const validateBrandInput = require('../../validation/brand');

router.get('/test', (req, res) => res.json({msg: "Brands Works"}));

router.post('/create', (req, res, next) => {
    const {errors, isValid} = validateBrandInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const newBrand = new Brand({

        brandName: req.body.brandName,
        brandNotes: req.body.brandNotes,
        category: req.body.category,
        status: req.body.status,
        created: req.body.created,
        updated: req.body.updated
    });

    newBrand.save((err, brands) =>{
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: brands})
    })
});



// router.get('/read', (req, res, next) => {
//
//     Brand.find({}).
//     populate('Category'). // only works if we pushed refs to children
//     exec(function (err, person) {
//         if (err) {
//             res.status(500).json({errmsg: err});
//
//             res.status(200).json({msg: person})
//         }
//     });
// });



router.get('/read', (req, res, next) => {

    Brand.find({}, (err, brands) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: brands})
    })
});



router.put('/updateBrand', (req, res, next) => {
    Brand.findById(req.body._id,(err, brand) => {
        if(err)
            res.status(500).json({errmsg: err});
        brand.brandName = req.body.brandName;
        brand.brandNotes = req.body.brandNotes;
        brand.status = req.body.status;
        brand.category = req.body.category;
        brand.created = req.body.created;
        brand.updated = req.body.updated;

        brand.save((err, brand) =>{
            if(err)
                res.status(500).json({errmsg: err});

            res.status(200).json({msg: brand})
        })
    })
});


router.put('/deleteBrand/:id', (req, res, next) => {
    Brand.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, brand) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: brand})
    })
});


router.get('/readCategory', (req, res, next) => {

    Category.find({}, (err, categories) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: categories})
    })
});



//Delete From Database
// router.delete('/deleteBrand/:id', (req, res, next) => {
//     Brand.findOneAndRemove({_id: req.params.id},(err, brand) => {
//         if(err)
//             res.status(500).json({errmsg: err});
//
//         res.status(200).json({msg: brand})
//     })
// });




module.exports = router;