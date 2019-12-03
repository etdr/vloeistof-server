const router = require('express').Router();

const Posts = require('../db').import('../models/posts');


// get posts for specific drink
router.get('/:id', async (req, res) => {
  try {
    const data = await Posts.findAll({
      where: { drinksId: req.params.id }
    });

    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// get specific post?


// post new comment
router.post('/:id', async (req, res) => {
  try {
    const p = req.body.post;

    const reply = Posts.create({
      title: p.title,
      content: p.content,
      edited: false
    });

    res.send(reply);
  } catch (err) {
    res.status(500).send(reply);
  }
});


// put




// delete








module.exports = router;