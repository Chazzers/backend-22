import getData from '../helpers/getData.js'

const renderGamesList = async (req, res) => {
	try {
		const title = 'Games'
		console.log(req.session.user)

		const games = await getData(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
			.then(games => games.results)


		res.render('games', {
			title: title,
			games: games
		})
	} catch(err) {
		return err
	}
}

export default renderGamesList