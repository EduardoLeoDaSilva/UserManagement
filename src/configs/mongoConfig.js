const {MongoClient} = require('mongodb')


const client = new MongoClient('mongodb+srv://root:02121441@dudkiller.dq5qlfs.mongodb.net/?retryWrites=true&w=majority');



client.connect().then(() => console.log('Conectado ao mongo')).catch((error) => error.message)
client.on('connection', () => {
    console.log('Conectado com sucesso no mongo db')
})

let collection = client.db('Messenger');

module.exports = collection;