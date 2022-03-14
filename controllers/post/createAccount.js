import User from '../../models/User.js'
import extractAllValuesFromKey from '../helpers/extractAllValuesFromKey.js'
import getData from '../helpers/getData.js'

const createAccount = async (req, res) => {
	try {
		let { username, password, age, firstName, lastName, favGameGenres, genreAmount, gender } = req.body
		const genreValues = []
		const users = await User.find({})
		const loggedIn = req.session.user ? false : true
	
		const usernames = extractAllValuesFromKey(users, 'username')
		const passwords = extractAllValuesFromKey(users, 'password')
	
		const usernameTaken = usernames.includes(username) ? true : false
		const passwordTaken = passwords.includes(password) ? true : false
		const under18 = age < 18

		const gameGenres = await getData(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`)
			.then(gameGenre => gameGenre.results)
		const genreArray = typeof favGameGenres === 'string' ? [favGameGenres] : favGameGenres
		if(genreArray) genreArray.forEach(genre => genreValues.push(genre))
	
		if(genreAmount === 'add' || genreAmount === 'remove') {
			// inspired by https://github.com/Chazzers/browser-technologies-2021
			if(genreAmount === 'remove' && typeof favGameGenres === 'object') favGameGenres.pop()
			if(genreAmount === 'add') genreValues.push('')
	
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
				gender: gender,
				loggedIn: loggedIn
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