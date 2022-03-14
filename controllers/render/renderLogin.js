const renderLogin = (req, res) => {
	const title = 'Login'
	const loggedIn = req.session.user === undefined ? false : true
	res.render('login', {
		title: title,
		layout: 'layout',
		loggedIn: loggedIn
	})
}

export default renderLogin