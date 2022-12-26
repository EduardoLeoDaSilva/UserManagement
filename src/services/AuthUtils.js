const { response } = require('express');
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')

class AuthUtils {

    static generateJwtToken(user) {
        let secret = process.env.SECRET;
        const token = jwt.sign({}, secret, {
            algorithm: 'HS256',
            audience: 'site',
            expiresIn: "10m",
            jwtid: uuid(),
            subject: user.email,
            issuer: 'webapp'
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