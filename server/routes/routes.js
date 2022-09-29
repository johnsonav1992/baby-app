const { register, login } = require('../controllers/auth')
const { getAllChildren, addChild, editChild, deleteChild } = require('../controllers/children')
const { isAuthenticated } = require('../middleware/isAuthenticated')

module.exports = app => {
    app.post('/register', register)
    app.post('/login', login)
    app.post('/children/:userId', addChild)
    app.get('/children/:userId', getAllChildren)
    app.put('/children/:userId/:childName', editChild)
    app.delete('/children/:userId', deleteChild)

}