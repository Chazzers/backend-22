import User from '../../models/User.js'
import extractAllValuesFromKey from '../helpers/extractAllValuesFromKey.js'

const createAccount = async (req, res) => {
	try {
		let { username, password, age, firstName, lastName, hobbies, hobbyAmount } = req.body
		const hobbyValues = []
		const users = await User.find({})
	
		const usernames = extractAllValuesFromKey(users, 'username')
		const passwords = extractAllValuesFromKey(users, 'password')
		console.log(usernames)
	
		const usernameTaken = usernames.includes(username) ? true : false
		const passwordTaken = passwords.includes(password) ? true : false
		const under18 = age < 18
	
		console.log(usernameTaken)
	
		if(hobbyAmount === 'add' || hobbyAmount === 'remove') {
			// inspired by https://github.com/Chazzers/browser-technologies-2021
			if(hobbyAmount === 'remove' && typeof hobbies === 'object') hobbies.pop()
			const hobbyArray = typeof hobbies === 'string' ? [hobbies] : hobbies
			if(hobbyArray) hobbyArray.forEach(hobby => hobbyValues.push(hobby))
			if(hobbyAmount === 'add') hobbyValues.push('')
	
			return res.render('create-account', {
				title: 'Create Account',
				usernameTaken: usernameTaken,
				passwordTaken: passwordTaken,
				under18: under18,
				username: username,
				password: password,
				age: age,
				hobbies: hobbyValues,
				firstName: firstName,
				lastName: lastName
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
				hobbies: hobbyValues,
				firstName: firstName,
				lastName: lastName
			})
		} else {
			await User.create({
				username: username,
				password: password,
				age: age,
				hobbies: hobbies,
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