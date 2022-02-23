const renderLogin = (req, res) => {
	const title = 'Login'
	res.render('login', {
		title: title,
		layout: 'layout'
	})
}

export default renderLogin