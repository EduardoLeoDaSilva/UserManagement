const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')

class AuthUtils {

    static generateJwtToken() {
        let secret = process.env.SECRET;
        const token = jwt.sign({}, secret, {
            algorithm: 'HS256',
            audience: 'site',
            expiresIn: "10m",
            jwtid: uuid(),
            subject: '',
        })
        return token;
    }

    static decodeToken(token) {
        try {
        let secret = process.env.SECRET;
            const decoded = jwt.verify(token, secret)
            return decoded;
        } catch (error) {
            console.log(error.message);
        }finally{
            return null;
        }
    }
}

module.exports = AuthUtils;