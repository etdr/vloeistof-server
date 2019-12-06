const router = require('express').Router();

const Ingredients = require('../db').import('../models/drinks');


// get all ingredients
router.get('/', async (req, res) => {
  try {
    const data = await Ingredients.findAll();

    res.json(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});


// get specific ingredient?
router.get('/:id', async (req, res) => {
  try {
    const data = await Ingredients.findOne({
      where: { id: req.params.id }
    });

    res.json(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});



// post new ingredient
router.post('/new', async (req, res) => {
  try {
    const d = req.body.drink;

    const reply = await Ingredients.create({
      name: d.name,
      comments: d.comments
    });

    res.send(reply);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



// modify ingredient
router.put('/:id', async (req, res) => {

});



// delete ingredient
router.delete('/:id', async (req, res) => {
  try {
    const data = await Ingredients.destroy({
      where: { id: id, userId}
    })
    res.status(200).json({message: data})
  }catch(error){
    res.status(500).send(error.message);
  }
});



module.exports = router;