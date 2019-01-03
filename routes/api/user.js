const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

router.get('/test', (req, res) => res.json({msg: "Users Works"}));


function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split('.')[1];
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey');
  if(!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject;
  next()
}


//////////////////User Register
router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

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
            password2: req.body.password2,
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
            newUser.save()
              .then(user => {
                const payload = {id: user.id, firstName: user.firstName, userType: user.userType}; //create jwt payload

                //Assign Token
                jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (error, token) => {

                  res.json({success: true, token: "Bearer " + token})

                })

              })
              .catch(err => console.log(err));
          });
        });
      }
    })
  });


///////////////////////User Login
router.post('/login', (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);

  //Check Validation
  if(!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

//Find User By email
  User.findOne({email})
    .then(user => {
      if(!user){
        return res.status(404).json({email: "User Not Found"});
      }


      bcrypt.compare(password, user.password).then(isMatch => {
          if(isMatch) {
            //User Matched
            const payload = {id: user.id, firstName: user.firstName, userType: user.userType}; //create jwt payload

            //Assign Token
            jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (error, token) => {

              res.json({success: true, token: "Bearer " + token})

            });

          }else{
            return res.status(400).json({password: "Password Incorrect"});
          }
        })
    })
});


////////////////////User Authenticate
// router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
//     res.json({
//       id: req.user.id,
//       firstName: req.user.firstName,
//       lastName:req.user.lastName,
//       status: req.user.status,
//       userType: req.user.userType,
//       email: req.user.email
//     });
//   }
// );


module.exports = router;
