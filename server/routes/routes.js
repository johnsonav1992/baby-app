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
    app.post('/children/:userId', addChild)
    app.get('/children/:userId', getAllChildren)
    app.put('/children/:userId/:childName', editChild)
    app.delete('/children/:userId', deleteChild)

    //feedings
    app.post('/feedings/:feedingId', addFeeding)
    app.get('/feedings/:childId', getAllFeedings)
    app.put('/feedings/:feedingId', editFeeding)
    app.delete('/feedings/:childId', deleteFeeding)

    //changings
    app.post('/changings/:changingId', addChanging)
    app.get('/changings/:childId', getAllChangings)
    app.put('/changings/:changingId', editChanging)
    app.delete('/changings/:childId', deleteChanging)

    //sleep
    app.post('/sleeps/:sleepId', addSleep)
    app.get('/sleeps/:childId', getAllSleeps)
    app.put('/sleeps/:sleepId', editSleep)
    app.delete('/sleeps/:childId', deleteSleep)

}