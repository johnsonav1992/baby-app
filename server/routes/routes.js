const { register, login } = require('../controllers/auth')
const { addChanging } = require('../controllers/changings')
const { getAllChildren, addChild, editChild, deleteChild } = require('../controllers/children')
const { addFeeding, getAllFeedings, editFeeding, deleteFeeding } = require('../controllers/feedings')
const { addChanging, getAllChangings, editChanging, deleteChanging } = require('../controllers/changings')
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

}