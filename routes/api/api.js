const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');


//Load Input Validation
const validateUserInput = require('../../validation/user');

router.get('/test', (req, res) => res.json({msg: "Api Works"}));


router.post('/create', (req, res, next) => {
    const {errors, isValid} = validateUserInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email})
        .then(user => {

            if (user) {
                return res.status(400).json({email: "Email already Exist"});
            } else {
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    userType: req.body.userType,
                    status: req.body.status,
                    createdBy: req.body.createdBy,
                    updatedBy: req.body.updatedBy,
                    created: req.body.created,
                    updated: req.body.updated
                });


                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save((err, user) => {
                            if (err)
                                res.status(500).json({errmsg: err});

                            res.status(200).json({msg: user})
                        });
                    });
                });

            }
        });
});



//
// router.post('/create', (req, res, next) => {
//
//   const newUser = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//     password2: req.body.password2,
//     userType: req.body.userType,
//     status: req.body.status,
//     createdBy: req.body.createdBy,
//     updatedBy: req.body.updatedBy,
//     created: req.body.created,
//     updated: req.body.updated
//   });
//
//     newUser.save((err, user) =>{
//       if(err)
//         res.status(500).json({errmsg: err});
//
//       res.status(200).json({msg: user})
//     })
// });
//

router.get('/read', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err)
      res.status(500).json({errmsg: err});

    res.status(200).json({msg: users})
  })
});


router.get('/view/:id', (req,res, next) => {
    User.findById(req.body._id, (err, users) => {
        if (err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: users})
    })
});



router.put('/update', (req, res, next) => {
  User.findById(req.body._id,(err, user) => {
    if(err)
      res.status(500).json({errmsg: err});
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.userType = req.body.userType;
      user.status = req.body.status;
      user.createdBy = req.body.createdBy;
      user.updatedBy = req.body.updatedBy;
      user.created = req.body.created;
      user.updated = req.body.updated;

      user.save((err, user) =>{
        if(err)
          res.status(500).json({errmsg: err});

          res.status(200).json({msg: user})
    })
  })
});



router.put('/delete/:id', (req, res, next) => {
    User.findOneAndUpdate({_id: req.params.id},{"$set":{"status":"3"}},{new: true},(err, user) => {
        if(err)
            res.status(500).json({errmsg: err});

        res.status(200).json({msg: user})
    })
});

//Delete From Database

//
// router.delete('/delete/:id', (req, res, next) => {
//   User.findOneAndRemove({_id: req.params.id},(err, user) => {
//     if(err)
//       res.status(500).json({errmsg: err});
//
//     res.status(200).json({msg: user})
//   })
// });




module.exports = router;
