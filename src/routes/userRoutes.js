const { Router } = require('express');
const express = require('express');
const UserController = require('../controllers/UserController.js')
const userRoutes = express.Router();

userRoutes
    .get('/', UserController.getAllUsers)
    .get('/:id', UserController.getUserById)
    .post('/', UserController.saveUser)
    .put('/', UserController.updateUser)
    .delete('/', UserController.deleteUser)


module.exports = userRoutes;