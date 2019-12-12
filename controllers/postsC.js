const router = require('express').Router();

const Posts = require('../db').import('../models/posts');
let Users = require('../db').import('../models/users');


// get posts for specific drink
router.get('/:id', async (req, res) => {
  try {
    const data = await Posts.findAll({
      where: { drinkId: req.params.id }
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

    const reply = await Posts.create({
      userId: req.user.id,
      drinkId: req.params.id,
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
router.put('/:id', async (req, res) => {
  try {
    id = req.params.id;
    userId = req.user.id;

    let title = req.body.post.title;
    let content = req.body.post.content;

    const u = await Users.findOne({where: {id:userId}});

    let p0 = await Posts.findOne({ where: u.admin ? {id} : {id, userId}})

    if (!title) title = p0.title;
    if (!content) content = p0.content;

    let response = await Posts.update({
      title,
      content,
      edited: true
    }, {where: u.admin ? {id} : {id, userId}});

    res.json(response);

  } catch (err) {
    res.status(500).json({message:err.message});
  }
})



// delete
router.delete('/:id', async (req, res) => {
  try {
    id = req.params.id;
    userId = req.user.id;

    let u = await Users.findOne({ where: { id: userId } });

    const data = await Posts.destroy({
      where: u.admin ? {id} : {id, userId}
    });

    res.status(200).json({message: data})

  } catch (err) {
    res.status(500).json({message:err.message});
  }
});







module.exports = router;