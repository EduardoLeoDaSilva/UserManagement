const { Router } = require('express');
const express = require('express');
const UserController = require('../controllers/UserController.js')
const userRoutes = express.Router();
const AuthUtils = require('../services/AuthUtils.js')

userRoutes.use((req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization == typeof String){
        authorization = authorization.toString().replace('Bearer', '');
    }
    let result = AuthUtils.decodeToken(authorization);
    console.log(req.url)
    if (req.url.toLowerCase() != '/login') {
        console.log('result', result)
        if (!result || !result['sub']) {
            return res.status(401).json({ error: 'Não autorizado' });
        }
    }
    next()
})

userRoutes
    .get('/', UserController.getAllUsers)
    .get('/:id', UserController.getUserById)
    .post('/', UserController.saveUser)
    .put('/', UserController.updateUser)
    .delete('/', UserController.deleteUser)
    .post('/logIn', UserController.logIn)


module.exports = userRoutes;