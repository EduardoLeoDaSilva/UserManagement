const express = require('express');
const { Server } = require('socket.io')
const path = require('path')
const http = require('http')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const dbMysql = require('./configs/sequelizeConfig.js')
const dbMongo = require('./configs/mongoConfig.js')
const routes = require('./routes')
const userRepo = require('./repositories/userRepo.js');
const { emit } = require('process');
const { verify } = require('jsonwebtoken');
const AuthUtils = require('./services/AuthUtils.js')

//Servindo parte estática

const absolutePath = path.join(__dirname, 'pages');
app.use(express.static(absolutePath));
app.use(express.json());
routes(app);
process.env.SECRET = 'Teste'
dbMysql.sync().then(() => {
    console.log('Fazendo migração')
}).catch((reason) => {
    console.log(reason);
})


server.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
})

io.on('connection', (socket) => {
    console.log(`Um usuário acabou de se conectar ${socket}`)
    socket.on('iniciarChat', async (e) => {
        let obj = JSON.parse(e);
        console.log(obj);

        let result = AuthUtils.decodeToken(obj.token);
        let chatTalk = await dbMongo.collection('Chats').findOne(
            { users: { $all: [obj.id, result['sub']] } }
        );


        if (!chatTalk) {
            let insertResponse = await dbMongo.collection('Chats').insertOne({
                users: [obj.id, result['id']],
                name: obj.name
            });

            socket.join(insertResponse.insertedId.toString());
        console.log('join no id', chatTalk._id.toString())

        } else {
            socket.join(chatTalk._id.toString());
        console.log('join no id', chatTalk._id.toString())

        }
    })

    socket.on('sendMessage', async (msg) => {
        let obj = JSON.parse(msg);
        let result = AuthUtils.decodeToken(obj.token);
        if (!result || !result['sub']) {
            return socket.disconnect();
        }

        let chatTalk = await dbMongo.collection('Chats').findOne(
            { users: { $all: [obj.id, result['id']] } }
        );


        if (!chatTalk) {
            chatTalk=  await dbMongo.collection('Chats').insertOne({
                users: [obj.id, result['id']],
                msg: [obj.msg]
            });
        } else {
            let msgFromBase = chatTalk.msg ? chatTalk.msg : [];
            msgFromBase.push(obj.msg)
            await dbMongo.collection('Chats').updateOne(
                {
                    
                        _id: chatTalk._id
                    
                },
                { $set: { msg: msgFromBase } }
            );
        }
        console.log('emitindo para o id', chatTalk._id.toString())
        socket.to(chatTalk._id.toString()).emit('msg', obj.msg)

    })
})



