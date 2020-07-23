const express = require('express')
const router = express.Router()

const Users = require('./users-model')
const restricted = require('../auth/restricted-middleware')

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Error getting users' })
        })
})

module.exports = router;