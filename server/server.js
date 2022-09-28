const express = require('express')
const cors = require('cors')
require('dotenv').config()
const colors = require('colors')
const { SERVER_PORT } = process.env

const { sequelize } = require('./database/database')
const { User } = require('./models/user')
const { Child } = require('./models/child')
const { Sleep } = require('./models/sleep')
const { Feeding } = require('./models/feeding')
const { Changing } = require('./models/changing')

const app = express()

///Middleware///
app.use(express.json())
app.use(cors())

///DB relations///
User.hasMany(Child)
Child.belongsTo(User) 
Child.hasMany(Sleep)
Sleep.belongsTo(Child)
Child.hasMany(Feeding)
Feeding.belongsTo(Child) 
Child.hasMany(Changing)
Changing.belongsTo(Child)

///Routes/// 
require('./routes/routes')(app)

sequelize
	.sync()
	.then(() => {
		app.listen(SERVER_PORT, () =>
			console.log(`DB synced and server running on port ${SERVER_PORT}`.magenta.bold)
		)
	})
	.catch(err => console.error(err))
