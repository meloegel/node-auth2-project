const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = require('express').Router()

const Users = require('../users/users-model')

router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcryptjs.hashSync(user.password, 10)
    user.password = hash
    Users.add(user)
        .then(saved => {
            const token = makeToken(saved)
            res.status(201).json({ data: user, token: token })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'error' })
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcryptjs.compareSync(password, user.password)) {
                const token = makeToken(user)
                res.status(200).json({ message: 'Welcome', jwt_token: token })
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'error' })
        })
})

function makeToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };
    const secret = process.env.JWR_SECRET || 'asfdughuidhuwqhihdiuahwuidhhawd'
    const options = {
        expiresIn: '1hr',
    }
    return jwt.sign(payload, secret, options)
}

module.exports = router;