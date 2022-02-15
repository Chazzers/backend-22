// server config
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
require('dotenv').config()


// Controller render functions
const renderHome = require('./controllers/render/renderHome.js')
const renderCreateAccount = require('./controllers/render/renderCreateAccount')

// Controller helper functions
const createAccount = require('./controllers/post/createAccount.js')


const uri = process.env.MONGODB_URI

mongoose.connect(uri)

app.use(express.static('public'))
	.set('view engine', 'ejs')

	.get('/', renderHome)
	.get('/create-account', renderCreateAccount)

	.post('/createAccount', createAccount)
	
	.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));