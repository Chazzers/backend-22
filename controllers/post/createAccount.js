import User from '../../models/User.js'
import extractAllValuesFromKey from '../helpers/extractAllValuesFromKey.js'

const createAccount = async (req, res) => {
	console.log(req.body)
	let { username, password, age, hobbies, hobbyAmount } = req.body
	const hobbyValues = []
	const users = await User.find({})

	const usernames = extractAllValuesFromKey(users, 'username')
	const passwords = extractAllValuesFromKey(users, 'password')

	const usernameTaken = usernames.includes(username) ? true : false
	const passwordTaken = passwords.includes(password) ? true : false
	const under18 = age < 18

	console.log(hobbies)

	// inspired by https://github.com/Chazzers/browser-technologies-2021

	if(hobbyAmount === 'remove' && typeof hobbies === 'object') hobbies.pop()
	const hobbyArray = typeof hobbies === 'string' ? [hobbies] : hobbies
	if(hobbyArray) hobbyArray.forEach(hobby => hobbyValues.push(hobby))
	if(hobbyAmount === 'add') hobbyValues.push('')
	
	if(usernameTaken || passwordTaken || under18) {
		return res.render('create-account', {
			title: 'Create Account',
			usernameTaken: usernameTaken,
			passwordTaken: passwordTaken,
			under18: under18,
			hobbies: hobbyValues
		})
	}  else {
		await User.create({
			username: username,
			password: password,
			age: age,
			hobbies: hobbies
		})
		res.redirect('/')
	}
}


export default createAccount