const Model = require('sequelize').Model;

module.exports = (seq, DT) => {
  class Drinks extends Model {}

  Drinks.init({
    name: { type: DT.STRING },
    ingredients: { type: DT.JSON },
    instructions: { type: DT.TEXT },
    thumbUrl: { type: DT.STRING },
    cDBId: { type: DT.INTEGER }
    
  }, {
    sequelize: seq,
    modelName: 'drinks'
  })

  return Drinks;
};