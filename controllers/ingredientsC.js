const router = require('express').Router();

const Ingredients = require('../db').import('../models/ingredients');
const Users = require('../db').import('../models/users');


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
      comments: d.comments,
      userId: req.user.id
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

    let u = await Users.findOne({ where: { id: userId } });
    let i0;

    if (u.admin) i0 = await Drinks.findOne({ where: { id } });
    else i0 = await Drinks.findOne({ where: { id, userId } });

    if (!name) name = i0.name;
    if (!comments) comments = i0.comments;

    let response = await Ingredients.update({
      name,
      comments
    }, {where: u.admin ? {id} : {id, userId}});

    res.json(response)

  } catch (err) {
    res.status(500).json({message: err.message});
  }
});



// delete ingredient
router.delete('/:id', async (req, res) => {
  try {
    let u = await Users.findOne({ where: { id: req.user.id } });
    let data;
    if (u.admin) {
      data = await Ingredients.destroy({
        where: { id: req.params.id }
      });
    } else {
      data = await Ingredients.destroy({
        where: { id: req.params.id, userId: req.user.id}
      });
    }
    res.status(200).json({message: data})
  }catch(error){
    res.status(500).send(error.message);
  }
});



module.exports = router;