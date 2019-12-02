const router = require('express').Router();

const UserInfo = require('../db').import('../models/userinfo');


// get userinfo for specific user (auth?)
router.get('/:id', async (req, res) => {

});


module.exports = router;