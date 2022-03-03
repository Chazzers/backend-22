const renderHome = (req, res) => {
	const title = 'Home'
	const loggedIn = req.session.user ? false : true
	console.log(loggedIn)
	console.log(req.session.user)
	return res.render('index', {
		title: title,
		layout: 'layout',
		loggedIn: loggedIn
	})
}

export default renderHome