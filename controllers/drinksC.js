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

});


// modify drink
router.put('/:id', async (req, res) => {

});


// delete drink
router.delete('/:id', async (req, res) => {
  try { 
    const data = await Drinks.destroy({
      where: { id: id, userId: userId}
    })
    res.status(200).json({message: data})
  }catch(error){
    res.status(500).send(error.message);
  }
});


module.exports = router;