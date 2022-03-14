const renderHome = (req, res) => {
	const title = 'Home'
	const loggedIn = req.session.user === undefined ? false : true
	
	return res.render('index', {
		title: title,
		layout: 'layout',
		loggedIn: loggedIn
	})
}

export default renderHome