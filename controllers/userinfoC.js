const router = require('express').Router();

const UserInfo = require('../db').import('../models/userinfo');


// get userinfo for specific user (auth?)
router.get('/:id', async (req, res) => {
  try {
    const data = UserInfo.findOne({
      where: { userId: auth }
    });

    res.send(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router;