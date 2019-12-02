const Model = require('sequelize').Model;

module.exports = (seq, DT) => {
  class Posts extends Model {}

  Posts.init({
    title: { type: DT.STRING },
    content: { type: DT.TEXT },
    edited: { type: DT.BOOLEAN }
  }, {
    sequelize: seq,
    modelName: 'posts'
  })

  return Posts;
};