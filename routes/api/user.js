const express = require('express');
const router = express.Router();


///////////////////
const User = require('../../models/User');


router.get('/test', (req, res) => res.json({msg: "Users Works"}));

router.get('/world', function(req, res){
  res.send("Hello World");
});

router.get('/current', (req, res) => {res.json({
    name: req.user.name,
  })}
);

// Get users
router.get('/users', (req, res) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
/////////////////////////
router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if(error){
      console.log(error)
    }else{
      res.status(200).send(registeredUser)
    }
  })
});


module.exports = router;
