const likeHandler = async (event) => {
	event.preventDefault()
	const { value } = event.currentTarget
	const likeValue = {
		newLike: value
	}
	const response = await fetch('/like-game', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(likeValue)
	})
	return response
}

export default likeHandler