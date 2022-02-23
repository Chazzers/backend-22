const renderCreateAccount = (req, res) => {
	const title = 'Create Account'
	return res.render('create-account', {
		title: title,
		hobbies: []
	})
} 

export default renderCreateAccount