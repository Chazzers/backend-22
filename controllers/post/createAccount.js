import User from '../../models/User.js'
import extractAllUsernames from '../helpers/extractAllUsernames.js'

const createAccount = async (req, res) => {
	console.log(req)
	console.log(req.body)
	const { username, password, age } = req.body
	const users = await User.find({})

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


export default createAccount