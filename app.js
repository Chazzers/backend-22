// server packages
import express from 'express'
const app = express()
const port = process.env.PORT || 3000
import mongoose from 'mongoose'
import compression from 'compression'
import session from 'express-session'

import {} from 'dotenv/config'

// npm packages
import { engine } from 'express-handlebars'

// Controller render functions
import renderHome from './controllers/render/renderHome.js'
import renderCreateAccount from './controllers/render/renderCreateAccount.js'
import renderLogin from './controllers/render/renderLogin.js'
import renderGamesList from './controllers/render/renderGamesList.js'

//controller post functions
import createAccount from './controllers/post/createAccount.js'
import login from './controllers/post/login.js'
import postLike from './controllers/post/postLike.js'

// Controller helper functions


const uri = process.env.MONGODB_URI

mongoose.connect(uri)

app.use(express.static('public'))
	.use(express.urlencoded({
		extended: true
	}))
	.use(express.json())
	.use(session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: true
		}
	}))
	.use(compression())
	.use((req, res, next) => {
		if(req.path === '/login' || req.path === '/create-account') {
			next()
		} else if(req.session.user === undefined) {
			res.redirect('/login')
		} else {
			next()
		}
	})

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
	.set('trust proxy', 1) // trust first proxy

	.get('/', renderHome)
	.get('/create-account', renderCreateAccount)
	.get('/login', renderLogin)
	.get('/games', renderGamesList)
	
	.post('/login', login)
	.post('/create-account', createAccount)
	.post('/like-game', postLike)
	
	.listen(process.env.PORT || port, () => console.log(`Example app listening on port http://localhost:${port}!`))