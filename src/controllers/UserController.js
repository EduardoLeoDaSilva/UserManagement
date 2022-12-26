const userRepo = require('../repositories/userRepo.js')
const AuthUtils = require('../services/AuthUtils.js')
class UserController {

    static async getAllUsers(req, res) {

        try {

             console.log(header);
            let result = await userRepo.findAll();

            if (result) {
                return res.status(200).json(result);
            }
            res.status(400).json({ error: 'Error ao consultar usuários' })

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async getUserById(req, res) {
        try {
            let { id } = res.params;
            let result = await userRepo.findByPk(id);

            if (result) {
                res.status(200).json(result);
            }
            res.status(400).json({ error: 'Error ao consulta usuário' })

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async saveUser(req, res) {
        try {
            let user = req.body;
            console.log(req.body)
            let result = await userRepo.create(user);

            if (result) {
                res.status(201).json(result);
            }
            res.status(400).json({ error: 'Error ao cadastrar usuário' })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async updateUser(req, res) {
        try {
            let user = req.body;
            let result = await userRepo.update(user, {
                where: {
                    id: user.id
                }
            });
            if (result) {
                res.status(200).json(result);
            }
            res.status(400).json({ error: 'Error ao cadastrar usuário' })

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async deleteUser(req, res) {
        try {
            const id = req.params.id;
            let result = userRepo.destroy({
                where: {
                    id: id
                }
            });
            if (result) {
                res.status(200).json(result)
            }
            res.status(400).json({ error: 'Erro ao deletar usuário' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async logIn(req, res) {
        try {
            const { email, password } = req.body;
            let result = await userRepo.findAll({
                where: {
                    email: email,
                    password: password
                }
            });
            console.log(result)
            if (result) {
                let token = AuthUtils.generateJwtToken(result[0])
               return res.status(200).json(token)
            }
            res.status(400).json({ error: 'Erro ao realizar o login' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async logOff(req, res) {
        try {
            const id = req.params.id;
            let result = userRepo.destroy({
                where: {
                    id: id
                }
            });
            if (result) {
                res.status(200).json(result)
            }
            res.status(400).json({ error: 'Erro ao deletar usuário' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async startChat(req, res) {

    }
}

module.exports = UserController;