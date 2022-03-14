import User from '../../models/User.js'

const postDislike = async (req, res) => {
	const { dislike } = req.body
	let { username, likedGames } = req.session.user

	const filteredLikedGames = likedGames.filter(game => game !== dislike)

	console.log(filteredLikedGames)

	req.session.user.likedGames = filteredLikedGames

	const currentUser = User.findOne({
		username: username
	})

	await currentUser.updateOne({
		'likedGames': filteredLikedGames
	})

	res.redirect('/my-profile')
}

export default postDislike