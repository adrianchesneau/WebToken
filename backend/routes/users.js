var express = require('express');
var router = express.Router();
const uid2 = require('uid2');
const bcrypt = require('bcrypt');


require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');


//route signup 
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'champ manquant ou non remplis' });
    return;
  }

  //check si le user existe dans la base de donnée ou non
  User.findOne({ email: req.body.email }).then(data => {
    if (data === null) {
      const token = uid2(32);
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        email: req.body.email,
        password: hash,
        token: token
      })

      newUser.save().then((data) => {
        res.json({ result: true, token: data.token, email: data.email })
      })
    } else {
      res.json({ result: false, error: 'User already exists', });

    }
  })
})



router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  User.findOne({ email: req.body.email }).then(data => {

    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token, password: data.password });
    } else {
      res.json({ result: false, error: 'User not found', data });
    }
  });
});


module.exports = router;
