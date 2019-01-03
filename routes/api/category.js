const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

//Load Input Validation
const validateCategoryInput = require('../../validation/category');



router.get('/test', (req, res) => res.json({msg: "Category Works"}));

router.post('/create', (req, res, next) => {
    const {errors, isValid} = validateCategoryInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const newCategory = new Category({

        categoryName: req.body.categoryName,
        categoryNotes: req.body.categoryNotes,
        status: req.body.status,
        created: req.body.created,
        updated: req.body.updated
    });

    newCategory.save((err, categories) =>{
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: categories})
    })
});



router.get('/read', (req, res, next) => {

    Category.find({}, (err, categories) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: categories})
    })
});



router.put('/updateCategory', (req, res, next) => {
    Category.findById(req.body._id,(err, category) => {
        if(err)
            res.status(500).json({errmsg: err});
        category.categoryName = req.body.categoryName;
        category.categoryNotes = req.body.categoryNotes;
        category.status = req.body.status;
        category.created = req.body.created;
        category.updated = req.body.updated;

        category.save((err, category) =>{
            if(err)
                res.status(500).json({errmsg: err});

            res.status(200).json({msg: category})
        })
    })
});


router.put('/deleteCategory/:id', (req, res, next) => {
    Category.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, category) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: category})
    })
});


//Delete From Database
// router.delete('/deleteCategory/:id', (req, res, next) => {
//     Category.findOneAndRemove({_id: req.params.id},(err, category) => {
//         if(err)
//             res.status(500).json({errmsg: err});
//
//         res.status(200).json({msg: category})
//     })
// });




module.exports = router;