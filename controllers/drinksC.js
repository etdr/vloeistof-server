const router = require('express').Router();

let Drinks = require('../db').import('../models/drinks');


// get all drinks
router.get('/', async (req, res) => {
  try {
    const data = await Drinks.findAll();

    res.send(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});


// get all drinks by a specific user
router.get('/user/:id', async (req, res) => {
  try {
    const data = await Drinks.findAll({
      where: { userId: req.params.id }
    });

    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// get specific drink
router.get('/:id', async (req, res) => {
  try {
    const data = await Drinks.findOne({
      where: { id: req.params.id }
    });

    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



// post new drink
router.post('/new', async (req, res) => {
  try {
    const d = req.body.drink;

    const reply = await Drinks.create({
      name: d.name,
      ingredients: d.ingredients,
      instructions: d.instructions
    });

    res.send(reply);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// modify drink
router.put('/:id', async (req, res) => {

});


// delete drink
router.delete('/:id', async (req, res) => {

});


module.exports = router;