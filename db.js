const Seq = require('sequelize');

const seq = new Seq(process.env.DATABASE_URL, {
  dialect: "postgres"
});

seq.authenticate().then(
  () => console.log('connected to postgres'),
  () => console.log('error connecting to postgres')
)


let Users = seq.import('./models/users');
let UserInfo = seq.import('./models/userinfo');
let Drinks = seq.import('./models/drinks');
let Ingredients = seq.import('./models/ingredients');
let Posts = seq.import('./models/posts');

// database associations go here
Users.hasOne(UserInfo);
UserInfo.belongsTo(Users);

Users.hasMany(Drinks);
Drinks.belongsTo(Users);

Users.hasMany(Ingredients);
Ingredients.belongsTo(Users);

Users.hasMany(Posts);
Posts.belongsTo(Users);



module.exports = seq;