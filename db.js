const Seq = require('sequelize');

const seq = new Seq(process.env.DATABASE_URL, {
  dialect: "postgres"
});

seq.authenticate().then(
  () => console.log('connected to postgres'),
  () => console.log('error connecting to postgres')
)


let User = seq.import('./models/users');
let UserInfo = seq.import('./models/userinfo');
let Drinks = seq.import('./models/drinks');
let Ingredients = seq.import('./models/ingredients');
let Posts = seq.import('./models/posts');

// database associations go here
User.hasOne(UserInfo);
UserInfo.belongsTo(User);

User.hasMany(Drinks);
Drinks.belongsTo(User);

User.hasMany(Ingredients);
Ingredients.belongsTo(User);

User.hasMany(Posts);
Posts.belongsTo(User);



module.exports = seq;