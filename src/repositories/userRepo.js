const { DataTypes, Model } = require('sequelize');
const db = require('../configs/sequelizeConfig.js');


const userRepo = 
    db.define('User', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false

        },
        name: {
            type: DataTypes.STRING,
            validate: {
                min: {
                    args: 3,
                    msg: 'Nome necessita minimo 3 caracteres'
                }
            },
            allowNull: false

        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Email inválido'
                }
            },
            unique: true,
            allowNull: false

        },
        age: {
            type: DataTypes.INTEGER,
            validate: {
                min: {
                    args: 18,
                    msg: 'Idade mínima 18 anos'
                }
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                min: {
                    args: 3,
                    msg: 'Necessária no minímo 3 caracteres'
                }
            },
            allowNull: false
        }
    })


module.exports = userRepo;