import User from '../../models/User.js'

const login = async (req, res) => {
	try {
		const { username, password } = req.body

		const currentUser = await User.findOne({
			username: username
		})
	
		const wrongPassword = currentUser.password !== password ? true : false
	
		if(wrongPassword) {
			res.render('index', {
				wrongPassword: wrongPassword
			})
		} else {
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
		return err
	}
}

export default login