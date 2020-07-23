const db = require('../data/db-config')

module.exports = {
    add,
    find,
    findBy,
    findById
}

function add(user) {
    return db('users').insert(user)
}

function find() {
    return db('users')
        .select('id', 'username', 'department')
}

function findBy(filter) {
    return db('users').where(filter).orderBy('id')
}

function findById(id) {
    return db('users')
        .where({ id })
        .first()
}