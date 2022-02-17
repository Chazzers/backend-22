const renderHome = (req, res) => {
	const title = 'Home'
	return res.render('index', {
		title: title,
		layout: 'layout'
	})
}

export default renderHome