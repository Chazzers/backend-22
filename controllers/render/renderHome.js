const  renderHome = (req, res) => {
	const title = 'Home'
	return res.render('home', {
		title: title
	})
}

module.exports = renderHome