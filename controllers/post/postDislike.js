import User from '../../models/User.js'

const postDislike = async (req, res) => {
	// properties from logged-in user
	let { username, likedGames } = req.session.user

	// game-id from submitted form
	const { dislike } = req.body

	// find logged-in user in database
	const currentUser = User.findOne({
		username: username
	})
	
	// filter likedgames to remove the id submitted by user dislike
	const filteredLikedGames = likedGames.filter(game => game !== dislike)

	// update logged-in user likedGames array
	req.session.user.likedGames = filteredLikedGames

	
	// update the logged-in users likedGames array
	await currentUser.updateOne({
		'likedGames': filteredLikedGames
	})

	// redirect to my-profile page
	res.redirect('/my-profile')
}

export default postDislike