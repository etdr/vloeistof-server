const Model = require('sequelize').Model;

module.exports = (seq, DT) => {
  class Users extends Model {}

  Users.init({
    username: {
      type: DT.STRING,
      unique: true
    },
    email: {
      type: DT.STRING,
      validate: {
        isEmail: true
      },
      unique: true
    },
    password: {
      type: DT.STRING
    },
    admin: {
      type: DT.BOOLEAN
    }
  }, {
    sequelize: seq,
    modelName: 'users'
  })

  return Users;
};