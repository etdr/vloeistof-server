const JWT = require('jsonwebtoken');
let Users = require('../db').import('../models/users');

const v = (req, res, next) => {
  if (req.method == 'OPTIONS') {
    next();
  } else {
    let token = req.headers.authorization;
    if (!token) return res.status(403).json({
      message: "no token provided"
    });
    else {
      JWT.verify(token, process.env.JWT_SECRET, (err, dec) => {
        if (dec) {
          Users.findOne({ where: { id: dec.id }})
            .then(user => {
              if (user==null) {
                res.status(400).json({message: "no user found"})
              } else {
                req.user = user;
                next();
              }
            }, () => {
              res.status(401).json({message: "database error"});
            });
        } else {
          res.status(400).json({
            message: "not authorized"
          });
        }
      })
    }
  }
};

module.exports = v;