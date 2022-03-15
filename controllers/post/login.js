import User from '../../models/User.js'

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
			// check if password is wrong, if it's wrong render login with wrongPassword var
			res.render('login', {
				wrongPassword: wrongPassword
			})
		} else {
			// set session user with database User information
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
			res.redirect('/games')
		}
	} catch(err) {
		console.log(err)
		res.render('login', {
			wrongUsername: true,
		})
	}
}

export default login