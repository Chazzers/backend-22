import getData  from '../helpers/getData.js'

const renderCreateAccount = async (req, res) => {
	const title = 'Create Account'

	const gameGenres = await getData(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`)
		.then(gameGenre => gameGenre.results)

	return res.render('create-account', {
		title: title,
		gameGenres: gameGenres
	})
} 

export default renderCreateAccount