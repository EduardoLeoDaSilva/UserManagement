const { response } = require('express');
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')

class AuthUtils {

    static generateJwtToken(user) {
        let secret = process.env.SECRET;
        const token = jwt.sign({
            id: user.id
        }, secret, {
            algorithm: 'HS256',
            audience: 'site',
            expiresIn: "1h",
            jwtid: uuid(),
            subject: user.id,
            issuer: 'webapp',
        })
        return token;
    }

    static decodeToken(token) {
        try {
            let secret = process.env.SECRET;
            let decoded = jwt.verify(token, secret)
            return decoded;
        } catch (error) {
            return null
        }
    }
}

module.exports = AuthUtils;