const router = require('express').Router();

//const Op = require('sequelize').Op;

//let Drinks = require('../db').import('../models/drinks');
let Users = require('../db').import('../models/users');



router.get('/', async (req, res) => {
  try {
    
    const u = await Users.findOne({where: {id: req.user.id}});
    
    if (u.admin) {
      const result = await Users.findAll();
      res.json(result);
    } else {
      res.json({message: "not an admin"})
    }



  } catch (err) {
    res.status(500).json({message:err.message})
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const u = await Users.findOne({where: {id: req.user.id}});
    
    if (u.admin) {
      const result = await Users.destroy({where: {id: req.params.id}});
      res.json({result});
    } else {
      res.json({message: "not an admin"})
    }


  } catch (err) {
    res.status(500).json({message:err.message})
  }
});





module.exports = router;