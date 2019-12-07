const Model = require('sequelize').Model;

module.exports = (seq, DT) => {
  class Drinks extends Model {}

  Drinks.init({
    name: { type: DT.STRING },
    ingredients: { type: DT.JSON },
    instructions: { type: DT.TEXT },
    favorite: { type: DT.BOOLEAN },
    thumbUrl: { type: DT.STRING },
    cDBId: { type: DT.INTEGER },
    
  }, {
    sequelize: seq,
    modelName: 'drinks'
  })

  return Drinks;
};