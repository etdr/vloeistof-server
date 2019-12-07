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
    const d = req.body.ing;

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
  try {
    const i = req.body.ingredient;
    const id = req.params.id;
    const userId = req.user.id;

    let name = i.name;
    let comments = i.comments;

    let i0 = await Ingredients.findOne({ id, userId });

    if (!name) name = i0.name;
    if (!comments) comments = i0.comments;

    let response = Ingredients.update({
      name,
      comments
    }, {where: {id, userId}});

    res.json(response)

  } catch (err) {
    res.status(500).json({message: err.message});
  }
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