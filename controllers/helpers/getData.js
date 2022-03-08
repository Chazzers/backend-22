
const getData = async (url) => {
	const data = await fetch(url)
		.then(res => {
			return res.json()
		})
		.then(games => games.results)
		.then(games => {
			// const newGames = games.filter(d => newLikedGames.indexOf(d.id) === -1)
			return games
		})
	return data
}

export default getData