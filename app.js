// server packages
import express from 'express'
const app = express()
const port = 3000
import mongoose from 'mongoose'
import compression from 'compression'

import {} from 'dotenv/config'

// npm packages
import { engine } from 'express-handlebars'

// Controller render functions
import renderHome from './controllers/render/renderHome.js'
import renderCreateAccount from './controllers/render/renderCreateAccount.js'
import renderLogin from './controllers/render/renderLogin.js'

// Controller helper functions
import createAccount from './controllers/post/createAccount.js'

const uri = process.env.MONGODB_URI

mongoose.connect(uri)

app.use(express.static('public'))
	.use(express.urlencoded({
		extended: true
	}))
	.use(express.json())
	.use(compression())

	.engine('hbs', engine({
		defaultLayout: 'layout', 
		extname: '.hbs',
		partialsDir: './views/partials',
		layoutsDir: './views/layouts',
		helpers: {
			//https://stackoverflow.com/questions/33059203/error-missing-helper-in-handlebars-js/46317662#46317662
			math: (lvalue, operator, rvalue) => {
				lvalue = parseFloat(lvalue)
				rvalue = parseFloat(rvalue)
				return {
					'+': lvalue + rvalue,
					'-': lvalue - rvalue,
					'*': lvalue * rvalue,
					'/': lvalue / rvalue,
					'%': lvalue % rvalue
				}[operator]
			}
		}
	}))

	.set('view engine', 'hbs')
	.set('views', './views')

	.get('/', renderHome)
	.get('/create-account', renderCreateAccount)
	.get('/login', renderLogin)

	.post('/createAccount', createAccount)
	
	.listen(process.env.PORT || port, () => console.log(`Example app listening on port http://localhost:${port}!`))