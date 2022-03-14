const renderLikedGames = (req, res) => {
	const title = 'Liked games'
	const { likedGames } = req.session.user
	const loggedIn = req.session.user === undefined ? false : true

	return res.render('liked-games', {
		title: title,
		likedGames: likedGames,
		loggedIn: loggedIn
	})
}

export default renderLikedGames