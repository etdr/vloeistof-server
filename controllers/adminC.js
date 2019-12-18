const router = require('express').Router();

//const Op = require('sequelize').Op;

//let Drinks = require('../db').import('../models/drinks');
let db = require('../db');
let Users = db.import('../models/users');
let Drinks = require('../db').import('../models/drinks');
let Posts = require('../db').import('../models/posts');
let Ingredients = require('../db').import('../models/ingredients');



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
      res.json({message: "not an admin"});
    }


  } catch (err) {
    res.status(500).json({message:err.message});
  }
});


router.delete('/cascade/:id', async (req, res) => {
  try {

    const u = await Users.findOne({where: {id: req.user.id}});
    
    if (u.admin) {
      
      const resultDrinks = await Drinks.destroy({where: {userId: req.params.id}});
      const resultPosts = await Posts.destroy({where: {userId: req.params.id}});
      const resultIngs = await Ingredients.destroy({where: {userId: req.params.id}});
      const result = await Users.destroy({where: {id: req.params.id}});
      res.json({result, resultDrinks, resultPosts, resultIngs});


    } else {
      res.json({message: "not an admin"});
    }



  } catch (err) {
    res.status(500).json({message:err.message});
  }
});






module.exports = router;