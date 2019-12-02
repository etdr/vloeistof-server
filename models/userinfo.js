const Model = require('sequelize').Model;

module.exports = (seq, DT) => {
  class UserInfo extends Model {}

  UserInfo.init({
    fullname: { type: DT.STRING },
    favorites: { type: DT.ARRAY(DT.STRING) }

  }, {
    sequelize: seq,
    modelName: 'userinfo'
  })

  return UserInfo;
};