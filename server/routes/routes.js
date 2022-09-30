const { register, login } = require('../controllers/auth')
const { getAllChildren, addChild, editChild, deleteChild } = require('../controllers/children')
const { addFeeding, getAllFeedings, editFeeding, deleteFeeding } = require('../controllers/feedings')
const { addChanging, getAllChangings, editChanging, deleteChanging } = require('../controllers/changings')
const { addSleep, getAllSleeps, editSleep, deleteSleep } = require('../controllers/sleeps')
const { isAuthenticated } = require('../middleware/isAuthenticated')

module.exports = app => {
    //auth
    app.post('/register', register)
    app.post('/login', login)

    //children
    app.post('/children/:userId', isAuthenticated, addChild)
    app.get('/children/:userId', isAuthenticated, getAllChildren)
    app.put('/children/:userId/:childName', isAuthenticated, editChild)
    app.delete('/children/:userId', isAuthenticated, deleteChild)

    //feedings
    app.post('/feedings/:feedingId', isAuthenticated, addFeeding)
    app.get('/feedings/:childId', isAuthenticated, getAllFeedings)
    app.put('/feedings/:feedingId', isAuthenticated, editFeeding)
    app.delete('/feedings/:childId', isAuthenticated, deleteFeeding)

    //changings
    app.post('/changings/:changingId', isAuthenticated, addChanging)
    app.get('/changings/:childId', isAuthenticated, getAllChangings)
    app.put('/changings/:changingId', isAuthenticated, editChanging)
    app.delete('/changings/:childId', isAuthenticated, deleteChanging)

    //sleep
    app.post('/sleeps/:childId', isAuthenticated, addSleep)
    app.get('/sleeps/:childId', isAuthenticated, getAllSleeps)
    app.put('/sleeps/:sleepId', isAuthenticated, editSleep)
    app.delete('/sleeps/:childId', isAuthenticated, deleteSleep)

}