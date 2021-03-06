const likeHandler = async (event) => {
	event.preventDefault()
	const { value } = event.currentTarget
	const likeValue = {
		newLike: value
	}

	const games = document.querySelectorAll('.game-card')
	const gamesArray = [...games]

	const likedGames = gamesArray.filter(game => game.dataset.id === value)

	console.log(likedGames)

	likedGames.forEach(game => game.classList.add('liked'))
	setTimeout(() => likedGames.forEach(game => game.classList.add('like-remove')), 1000)
	
	const response = await fetch('/like-game', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(likeValue)
	})
	return response
}

export default likeHandler