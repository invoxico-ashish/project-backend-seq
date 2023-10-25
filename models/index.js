const { Sequelize,Op,DataTypes } = require("sequelize");

let database = process.env.DB_DATABASE;
let user = process.env.DB_USER;
let password = process.env.PASSWORD;
let dialect = process.env.DIALECT;
let host = process.env.DB_HOST;
let max = parseInt(process.env.MAX, 10);
let Min = parseInt(process.env.Min, 10);
let acquire = process.env.ACQUIRE;
let idle = process.env.IDLE;
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: dialect,
    logging: false,
    pool: { max: max, min: Min, acquire: acquire, idle: idle }
});
sequelize.authenticate()
    .then(() => { console.log("connected") })
    .catch(err => { console.log(err) });


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.admin = require("../models/admin")(sequelize, DataTypes);
db.prodCate = require("../models/prod_category")(sequelize, DataTypes);
db.Tags = require("../models/prod_tags")(sequelize, DataTypes)
db.sequelize.sync({ force: false }).then(() => {
    console.log('yes re-sync done!');
});


module.exports = db;