# backend-22 - Game dates application
Repository for backend subject of HvA. This repository containst the application: Game dates. With this application you will be able to create an account and like games.

## Features

- Like games
- Dislike games
- Create account
- Login

Underneath you can see the functions used to make these features work. I hope my comments will suffice as an explanation to how my code functions. 

### Like games

```javascript
const postLike = async (req, res) => {
	try {
		// properties from logged in user
		const { username, likedGames } = req.session.user

		// game-id from submitted form
		const { newLike } = req.body

		// find logged-in user in database
		const currentUser = await User.findOne({
			username: username
		})

		// push new liked game to the likedGames array
		likedGames.push(newLike)
		
		// update the logged-in users likedGames array
		req.session.user.likedGames = likedGames
		
		// update the logged-in users likedGames array
		await currentUser.updateOne({
			'likedGames': likedGames
		})

		// redirect back to games page
		res.redirect('/games')
	} catch(err) {
		return err
	}
}
```

### Dislike games

```javascript
const postDislike = async (req, res) => {
	// properties from logged-in user
	let { username, likedGames } = req.session.user

	// game-id from submitted form
	const { dislike } = req.body

	// find logged-in user in database
	const currentUser = User.findOne({
		username: username
	})
	
	// filter likedgames to remove the id submitted by user dislike
	const filteredLikedGames = likedGames.filter(game => game !== dislike)

	// update logged-in user likedGames array
	req.session.user.likedGames = filteredLikedGames

	
	// update the logged-in users likedGames array
	await currentUser.updateOne({
		'likedGames': filteredLikedGames
	})

	// redirect to my-profile page
	res.redirect('/my-profile')
}
```


### Create an account

```javascript
const createAccount = async (req, res) => {
	try {
		// Inputs from submitted form
		let { username, password, age, firstName, lastName, favGameGenres, genreAmount, gender } = req.body

		// Empty genrevalues array that I will be pushing to to create more or less genre select fields
		const genreValues = []

		// Find all users in database
		const users = await User.find({})
		
		// function that takes an array and a string value to map property values to an array
		const extractAllValuesFromKey = (array, key) => {
			return array.map(item => item[key])
		}
		// create array with all username values
		const usernames = extractAllValuesFromKey(users, 'username')
		// create array with all password values
		const passwords = extractAllValuesFromKey(users, 'password')
	
		// check if username is already in database
		const usernameTaken = usernames.includes(username) ? true : false
		// check if password is already in database
		const passwordTaken = passwords.includes(password) ? true : false
		// check if age input is under the value 18
		const under18 = age < 18

		// function that accepts an url and fetches it
		const getData = async (url) => {
			return await fetch(url)
				.then(res => res.json())
		}
		// find all game genres that are used in the RAWG api
		const gameGenres = await getData(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`)
			.then(gameGenre => gameGenre.results)

		// Check if favGamegenres is a string and if it is a string, convert it to an array. This way i can use array methods on the genres I get from the form. 
		const genreArray = typeof favGameGenres === 'string' ? [favGameGenres] : favGameGenres

		// push genreArray values to the empty genreValues array
		if(genreArray) genreArray.forEach(genre => genreValues.push(genre))
	
		if(genreAmount === 'add' || genreAmount === 'remove') {
			// inspired by https://github.com/Chazzers/browser-technologies-2021

			// there are two buttons to add and remove a genre, with their own submit action. the name the button has is genreAmount and the value of the add one is 'add' and the other is remove.
			// if remove button is clicked, remove the last value of genreValues array. 
			if(genreAmount === 'remove' && typeof favGameGenres === 'object') genreValues.pop()
			// if add button is clicked, push an empty string to the values array. This will cause for a new select input for a genre to appear in the client. 
			if(genreAmount === 'add') genreValues.push('')
	
			return res.render('create-account', {
				title: 'Create Account',
				// error messages
				usernameTaken: usernameTaken,
				passwordTaken: passwordTaken,
				under18: under18,
				// make it so the user doesn't have to re-enter the following values
				username: username,
				password: password,
				age: age,
				firstName: firstName,
				lastName: lastName,

				gender: gender,
				// amount of genre inputs
				favGameGenres: genreValues,
				// genre options from RAWG
				gameGenres: gameGenres,
			})
		} else if(usernameTaken || passwordTaken || under18) {
			return res.render('create-account', {
				title: 'Create Account',
				usernameTaken: usernameTaken,
				passwordTaken: passwordTaken,
				under18: under18,
				username: username,
				password: password,
				age: age,
				favGameGenres: genreValues,
				gameGenres: gameGenres,
				firstName: firstName,
				lastName: lastName,
				gender: gender
			})
		} else {
			// create new user through the User object, and send the properties from the form to this user.
			await User.create({
				username: username,
				password: password,
				age: age,
				gender: gender,
				favGameGenres: genreValues,
				firstName: firstName,
				lastName: lastName
			})
			res.redirect('/')
		}
	} catch(err) {
		return err
	}
}
```

### logging into account
```javascript
const login = async (req, res) => {
	try {
		// get username and password from submitted form
		const { username, password } = req.body

		// find user in database with submitted username
		const currentUser = await User.findOne({
			username: username
		})
		
		// check if password of user input is different from password from user in database
		const wrongPassword = currentUser.password !== password ? true : false
	

		if(wrongPassword) {
			// if the password is wrong, re-render page with wrong password variable passed on
			res.render('index', {
				wrongPassword: wrongPassword
			})
		} else {
			// set session user with database User
			req.session.user = {
				username: currentUser.username,
				password: currentUser.password,
				firstName: currentUser.firstName,
				lastName: currentUser.lastName,
				age: currentUser.age,
				gender: currentUser.gender,
				favGameGenres: currentUser.favGameGenres,
				likedGames: currentUser.likedGames
			}
			// redirect to games page
			res.redirect('/games')
		}
	} catch(err) {
		return err
	}
```

## Progressive Enhancement

One of the assignments for this project was to create a progressive enhancement for your main feature. 

### What is progressive enhancement

A progressive enhancement is essentially when a feature works on every layer of your application and gets better with each added layer. So for example, in the browser you have the layers: html, css and client-side javascript. In the first layer, every button and form has to work. Afterwards css will make the buttons and forms prettier. And then client-side javascript will make the entire experience better and more user friendly.


### My progressively enhanced 'Like' feature

#### Layer 1: HTML

When clicking on this button a form will be submitted to the node server to a certain route. After submitting this form the formdata will be handled and it will result in adding a game to your Liked Games list. Afterwards the page will be refreshed with the liked game gone from the games page. 

![html layer progressive enhancement](https://user-images.githubusercontent.com/33430669/158829889-8f014452-78ad-4d18-970d-f757b8c43569.jpg)


#### Layer 2: CSS

In this layer, the styling and layout of the application looks more clean and structured. Since only styling is added the application on the backend still functions as written above.

![layer-2-css](https://user-images.githubusercontent.com/33430669/158830165-b6801ed5-74dc-43d8-a1dc-d6ec25985240.jpg)


#### Layer 3: Client-side JavaScript

In this layer i've added a client-side on click post request so that after pressing the like button, the page will not refresh. This way it was possible for me to add a 'collapse' animation after liking a game. 

![layer-3-client-side-js](https://user-images.githubusercontent.com/33430669/158830962-3fcc4073-94fa-4282-89b3-b7235250e33f.jpg)

The client side code for this is the following: 

This function takes an array of html elements, an interaction for example a 'click' string and a callback function. The array is looped so event listeners are added to each element in the array with the specified callback. 

`js/addMultipleEventListeners.js`
```javascript
const addMultipleEventListeners = (array, interaction, callBack) => array.forEach(item => item.addEventListener(interaction, callBack))

export default addMultipleEventListeners
```

This function below is explained through comments.
`js/dislikeHandler.js`
```javascript
const dislikeHandler = async (event) => {
	// So the form will not submit.
	event.preventDefault()
	// value of the clicked button
	const { value } = event.currentTarget

	// create an object for the like value
	const likeValue = {
		dislike: value
	}

	// all elements with the class game-card
	const games = document.querySelectorAll('.game-card')
	// transform the nodelist to an array
	const gamesArray = [...games]

	// filter liked games from the gamesArray
	const likedGames = gamesArray.filter(game => game.dataset.id === value)
	
	// add class liked to the likedGames
	likedGames.forEach(game => game.classList.add('liked'))

	// add a like-remove class to the liked games after 1 second.
	setTimeout(() => likedGames.forEach(game => game.classList.add('like-remove')), 1000)


	// post request to dislike route with the game id
	const response = await fetch('/dislike-game', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(likeValue)
	})
	return response
}

export default dislikeHandler
```

`js/likeHandler.js`
```javascript
const likeHandler = async (event) => {
	// So the form will not submit.
	event.preventDefault()
	// value of the clicked button
	const { value } = event.currentTarget

	// create an object for the like value
	const likeValue = {
		newLike: value
	}
    // all elements with the class game-card
	const games = document.querySelectorAll('.game-card')
	// transform the nodelist to an array
	const gamesArray = [...games]

    // filter liked games from the gamesArray
	const likedGames = gamesArray.filter(game => game.dataset.id === value)

	// add class liked to the likedGames
	likedGames.forEach(game => game.classList.add('liked'))
	// add a like-remove class to the liked games after 1 second.
	setTimeout(() => likedGames.forEach(game => game.classList.add('like-remove')), 1000)

	// post request to like route with the game id
	const response = await fetch('/like-game', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(likeValue)
	})
	return response
}

export default likeHandler
```

`js/main.js`
```javascript
// global variables
const likeButtons = document.querySelectorAll('.like-button')
const dislikeButtons = document.querySelectorAll('.dislike-button')
const likeButtonsArray = [...likeButtons]
const dislikeButtonsArray = [...dislikeButtons]

// helper and callback functions
import addMultipleEventListeners from './addMultipleEventListeners.js'
import likeHandler from './likeHandler.js'
import dislikeHandler from './dislikeHandler.js'

// check if like buttons exist to prevent error for other routes without like buttons
if(likeButtons) {
	addMultipleEventListeners(likeButtonsArray, 'click', likeHandler)
}

// check if dislike buttons exist to prevent error for other routes without like buttons
if(dislikeButtons) {
	addMultipleEventListeners(dislikeButtonsArray, 'click', dislikeHandler)
}
```
## Environment variables

If you're a developer and want to edit and use this application's code, you will have to setup your own [mongodb database](https://www.mongodb.com) and get an API key from [RAWG](https://rawg.io/).

## Installation guide
To install this application use the following command in your terminal:

```javascript
npm install
```
## Running the application

### As a developer
To run this application you need to run the following command in your terminal:

```javascript
npm run dev
```

### Production

To run this app in a production environment use the following command in your terminal:

```javascript
npm run start
```
