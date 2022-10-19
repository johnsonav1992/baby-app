const { register, login, editUserInfo, checkOldPassword, changePassword, deleteUser } = require('../controllers/auth')
const { getAllChildren, addChild, editChild, deleteChild } = require('../controllers/children')
const { addFeeding, getAllFeedings, editFeeding, deleteFeeding } = require('../controllers/feedings')
const { addChanging, getAllChangings, editChanging, deleteChanging } = require('../controllers/changings')
const { addSleep, getAllSleeps, editSleep, deleteSleep } = require('../controllers/sleeps')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const path = require('path')

module.exports = app => {
    //static frontend
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
      })

    //auth
    app.post('/api/register', register)
    app.post('/api/login', login)
    app.put('/api/users/:userId', isAuthenticated, editUserInfo)
    app.put('/api/users/password/:userId', isAuthenticated, changePassword)
    app.post('/api/users/password/:userId', isAuthenticated, checkOldPassword)
    app.delete('/api/users/:userId', isAuthenticated, deleteUser)

    //children
    app.post('/api/children/:userId', isAuthenticated, addChild)
    app.get('/api/children/:userId', getAllChildren)
    app.put('/api/children/:userId/:childName', isAuthenticated, editChild)
    app.delete('/api/children/:userId', isAuthenticated, deleteChild)

    //feedings
    app.post('/api/feedings/:childId', isAuthenticated, addFeeding)
    app.get('/api/feedings/:childId', isAuthenticated, getAllFeedings)
    app.put('/api/feedings/:feedingId', isAuthenticated, editFeeding)
    app.delete('/api/feedings/:feedingId', isAuthenticated, deleteFeeding)

    //changings
    app.post('/api/changings/:childId', isAuthenticated, addChanging)
    app.get('/api/changings/:childId', isAuthenticated, getAllChangings)
    app.put('/api/changings/:changingId', isAuthenticated, editChanging)
    app.delete('/api/changings/:changingId', isAuthenticated, deleteChanging)

    //sleep
    app.post('/api/sleeps/:childId', isAuthenticated, addSleep)
    app.get('/api/sleeps/:childId', isAuthenticated, getAllSleeps)
    app.put('/api/sleeps/:sleepId', isAuthenticated, editSleep)
    app.delete('/api/sleeps/:sleepId', isAuthenticated, deleteSleep)

}