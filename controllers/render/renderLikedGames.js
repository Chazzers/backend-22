const renderLikedGames = (req, res) => {
	const title = 'Liked games'
	const { likedGames } = req.session.user

	return res.render('liked-games', {
		title: title,
		likedGames: likedGames
	})
}

export default renderLikedGames