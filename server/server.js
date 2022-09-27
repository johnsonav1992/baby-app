const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { SERVER_PORT } = process.env

const { sequelize } = require('./database/database')

const app = express()

app.use(express.json())
app.use(cors())

sequelize
	.sync()
	.then(() => {
		app.listen(SERVER_PORT, () =>
			console.log(`Server running on port ${SERVER_PORT}`)
		)
	})
	.catch(err => console.error(err))
