const express = require('express')
const cors = require('cors')
require('dotenv').config()
const colors = require('colors')
const { SERVER_PORT } = process.env

const { sequelize } = require('./database/database')

const app = express()

///Middleware///
app.use(express.json())
app.use(cors())

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
