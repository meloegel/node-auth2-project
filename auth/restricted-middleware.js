const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    const secret = process.env.JWR_SECRET || 'asfdughuidhuwqhihdiuahwuidhhawd'
    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                console.log(error)
                res.status(401).json({ error: 'Error with token' })
            } else {
                req.jwt = decodedToken
                next()
            }
        })
    } else {
        res.status(401).json({ message: 'You need a valid token' })
    }
}