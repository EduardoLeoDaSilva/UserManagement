const userRepo = require('../repositories/userRepo.js')
class UserController {

    static async getAllUsers(req, res) {

        try {
            let result = await userRepo().findAll();

            if (result) {
                res.status(200).json(result);
            }
            res.status(400).json({ error: 'Error ao consultar usuários' })

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async getUserById(req, res) {
        try {
            let { id } = res.params;
            let result = await userRepo().findByPk(id);

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
            let result = await userRepo().create(user);

            if (result) {
                res.status(201).json(result);
            }
            res.status(400).json({ error: 'Error ao cadastrar usuário' })

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async updateUser(req, res) {
        try {
            let user = req.body;
            let result = await userRepo().update(user, {
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
            let result = userRepo().destroy({
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