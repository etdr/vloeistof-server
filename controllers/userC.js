const router = require('express').Router();
const JWT = require('jsonwebtoken');
const BC = require('bcryptjs');

let Users = require('../db').import('../models/users');


router.get('/:id', async (req, res) => {
  try {

    const u = await Users.findOne({where: {id: req.params.id}});

    res.json({
      username: u.username
    })

  } catch (err) {
    res.status(500).json({message:err.message});
  }
});



// POST /signup
router.post('/signup', async (req, res) => {
  try {
    let user = await Users.create({
      username: req.body.user.username,
      email: req.body.user.email,
      password: BC.hashSync(req.body.user.password)
    });
  
    let token = JWT.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "7d"});

    res.json({
      user,
      message: "user created",
      token
    });
  
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// POST /signin
router.post('/signin', async (req, res) => {
  try {
    let user = await Users.findOne({ where: {username: req.body.user.username } });

    if (user) {
      BC.compare(req.body.user.password, user.password, (err, matches) => {
        if (matches) {
          let token = JWT.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "7d"});
          res.json({
            user,
            message: "user authenticated",
            token
          });
        } else {
          res.status(502).json({error: "password mismatch"});
        }
      });
    } else {
      res.status(502).json({error: "no user found"});
    }

  } catch (err) {
    res.status(500).send(err.message);
  }
});








module.exports = router;