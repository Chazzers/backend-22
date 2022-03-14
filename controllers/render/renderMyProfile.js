import getData from '../helpers/getData.js'

const renderMyProfile = async (req, res) => {
	const { firstName, lastName, favGameGenres, likedGames } = req.session.user

	const title = 'My profile'

	const loggedIn = req.session.user === undefined ? false : true
	const games = await getData(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
		.then(games => games.results)

	
	const filteredGames = games.filter(game => {
		return likedGames.includes(`${game.id}`)
	})

	res.render('my-profile', {
		title: title,
		firstName: firstName,
		lastName: lastName,
		favGameGenres: favGameGenres,
		games: filteredGames,
		loggedIn: loggedIn,
		myProfile: true
	})
}

export default renderMyProfile