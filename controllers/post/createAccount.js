const User = require('../../models/User.js')
const extractAllUsernames = require('../helpers/extractAllUsernames.js')

const createAccount = async (req, res) => {
	const { username, password, age } = req.body
	const users = User.find({})

	const usernames = extractAllUsernames(users)

	if(usernames.includes(username)) {
		const urlParams = new URLSearchParams({
			usernameTaken: true
		})

		return res.redirect(`/create-account?${urlParams}`)
	} else {
		await User.create({
			username: username,
			password: password,
			age: age
		})
		res.redirect('/')
	}
}


module.exports = createAccount