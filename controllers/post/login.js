import User from '../../models/User.js'

const login = async (req, res) => {
	try {
		const { username, password } = req.body

		const user = await User.find({
			username: username
		})
	
		const currentUser = user[0]
	
		console.log(currentUser)
	
		const wrongPassword = currentUser.password !== password ? true : false
	
		if(wrongPassword) {
			res.render('index', {
				wrongPassword: wrongPassword
			})
		} else {
			req.session.user = {
				username: currentUser.username,
				password: currentUser.password,
				// firstName: currentUser.firstName,
				// lastName: currentUser.lastName,
				age: currentUser.age,
				// gender: currentUser.gender,
				hobbies: currentUser.hobbies
			}
			res.redirect('/')
		}
	} catch(err) {
		return err
	}
}

export default login