const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const colors = require('colors')

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

app.use(express.static(path.resolve(__dirname, '../build')))

///DB relations///
User.hasMany(Child, { onDelete: 'CASCADE' })
Child.belongsTo(User, { onDelete: 'CASCADE' }) 
Child.hasMany(Sleep, { onDelete: 'CASCADE' })
Sleep.belongsTo(Child, { onDelete: 'CASCADE' })
Child.hasMany(Feeding, { onDelete: 'CASCADE' })
Feeding.belongsTo(Child, { onDelete: 'CASCADE' }) 
Child.hasMany(Changing, { onDelete: 'CASCADE' })
Changing.belongsTo(Child, { onDelete: 'CASCADE' })

///Routes/// 
require('./routes/routes')(app)

const port = process.env.PORT || 4000

sequelize
	.sync({alter: true})
	.then(() => {
		app.listen(port, () =>
			console.log(`DB synced and server running on port ${port}`.magenta.bold)
		)
	})
	.catch(err => console.error(err))
