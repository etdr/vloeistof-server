const Model = require('sequelize').Model;

module.exports = (seq, DT) => {
  class Drinks extends Model {}

  Drinks.init({
    name: { type: DT.STRING },
    ingredients: { type: DT.JSON },
    directions: { type: DT.TEXT },
    

  }, {
    sequelize: seq,
    modelName: 'drinks'
  })

  return Drinks;
};