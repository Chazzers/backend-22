import getData from '../helpers/getData.js'

const renderGamesList = async (req, res) => {
	try {
		const title = 'Games'
		const loggedIn = req.session.user === undefined ? false : true

		const { likedGames } = req.session.user
		

		const games = await getData(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
			.then(games => games.results)
		
		const notLikedGames = games.filter(game => {
			return likedGames.includes(`${game.id}`) ? false : true
		})
		
		res.render('games', {
			title: title,
			games: notLikedGames,
			loggedIn: loggedIn,
		})
	} catch(err) {
		return err
	}
}

export default renderGamesList