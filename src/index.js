const express = require('express');
const { Server } = require('socket.io')
const path = require('path')
const http = require('http')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const dbMysql = require('./configs/sequelizeConfig.js')
const collectionMongo = require('./configs/mongoConfig.js')
const routes = require('./routes')
const userRepo = require('./repositories/userRepo.js')
//Servindo parte estática

const absolutePath = path.join(__dirname, 'pages');
app.use(express.static(absolutePath));
app.use(express.json());
routes(app);
process.env.SECRET = 'Teste'
dbMysql.sync().then(()=> {
    console.log('Fazendo migração')
}).catch((reason) => {
    console.log(reason);
})


server.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
})

io.on('connection', (socket)=>{
    console.log(`Um usuário acabou de se conectar ${socket}`)
})

