import User from '../../models/User.js'
import extractAllValuesFromKey from '../helpers/extractAllValuesFromKey.js'
import getData from '../helpers/getData.js'

const createAccount = async (req, res) => {
	try {
		// Inputs from submitted form
		let { username, password, age, firstName, lastName, favGameGenres, genreAmount, gender } = req.body

		// Empty genrevalues array that I will be pushing to to create more or less genre select fields
		const genreValues = []

		// Find all users in database
		const users = await User.find({})
		
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


export default createAccount