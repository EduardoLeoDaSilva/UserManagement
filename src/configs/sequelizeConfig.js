const {Sequelize} = require('sequelize')

const db = new Sequelize({
   host: 'localhost',
   dialect: 'mysql',
   username: 'root',
   password: '02121441',
   database: 'messanger'
});


db.authenticate()
.then(()=> console.log('Conectado ao mysql'))
.catch((e) => console.log('Erro ao se conectar ao mysql'));

module.exports = db;