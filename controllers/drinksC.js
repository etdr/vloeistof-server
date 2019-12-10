const router = require('express').Router();

const Op = require('sequelize').Op;

let Drinks = require('../db').import('../models/drinks');
let Users = require('../db').import('../models/users');

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


router.get('/user/:id/created', async (req, res) => {
  try {
    const data = await Drinks.findAll(
      {where: { cDBId: 0, userId: req.params.id }}
    );

    res.send(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/user/:id/api', async (req, res) => {
  try {
    const data = await Drinks.findAll(
      {where: { cDBId: { [Op.ne]: 0 }, userId: req.params.id }}
    );

    res.send(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/user/:id/favorite', async (req, res) => {
  try {
    const data = await Drinks.findAll(
      {where: { favorite: true, userId: req.params.id }}
    );

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
      instructions: d.instructions,
      cDBId: d.cDBId,
      userId: req.user.id,
      thumbUrl: d.thumbUrl,
      favorite: d.favorite
    });

    res.send(reply);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// modify drink
router.put('/:id', async (req, res) => {
  try {

    const d = req.body.drink;
    const id = req.params.id;
    const userId = req.user.id;

    let name = d.name;
    let ingredients = d.ingredients;
    let instructions = d.instructions;
    let thumbUrl = d.thumbUrl;
    let favorite = d.favorite;
    let cDBId = d.cDBId;

    let u = await Users.findOne({ where: { id: userId } });
    let d0;

    if (u.admin) d0 = await Drinks.findOne({ where: { id } });
    else d0 = await Drinks.findOne({ where: { id, userId } });

    if (!name) name = d0.name;
    if (!ingredients) ingredients = d0.ingredients;
    if (!instructions) instructions = d0.instructions;
    if (!thumbUrl) thumbUrl = d0.thumbUrl;
    if (!favorite) favorite = d0.favorite;
    if (!cDBId) cDBId = d0.cDBId;

    let response = await Drinks.update({
      name,
      ingredients,
      instructions,
      thumbUrl,
      favorite,
      cDBId
    }, {where: u.admin ? {id} : {id, userId}});

    res.json(response)

  } catch (err) {
    res.status(500).json({message: err.message});
  }
});


// delete drink
router.delete('/:id', async (req, res) => {
  try { 
    let u = await Users.findOne({ where: { id: req.user.id } });
    let data;
    if (u.admin) {
      data = await Drinks.destroy({
        where: { id: req.params.id }
      });
    } else {
      data = await Drinks.destroy({
        where: { id: req.params.id, userId: req.user.id}
      });
    }
    res.status(200).json({message: data})
  }catch(error){
    res.status(500).send(error.message);
  }
});


module.exports = router;