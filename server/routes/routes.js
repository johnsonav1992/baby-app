const { register, login } = require('../controllers/auth')
const { isAuthenticated } = require('../middleware/isAuthenticated')

module.exports = app => {
    app.post('/register', register)
    app.post('/login', login)

}