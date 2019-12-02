const Model = require('sequelize').Model;

module.exports = (seq, DT) => {
  class Ingredients extends Model {}

  Ingredients.init({
    name: { type: DT.STRING },
    comments: { type: DT.TEXT }
  }, {
    sequelize: seq,
    modelName: 'ingredients'
  })

  return Ingredients;;
};