const express = require('express');
const router = express.Router();
const City = require('../../models/City');


router.get('/test', (req, res) => res.json({msg: "City Works"}));


router.get('/read', (req, res, next) => {
    City.find({}, (err, cities) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: cities})
    })
});



module.exports = router;
