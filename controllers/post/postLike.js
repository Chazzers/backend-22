import User from '../../models/User.js'

const postLike = async (req, res) => {
	try {
		// properties from logged in user
		const { username, likedGames } = req.session.user

		// game-id from submitted form
		const { newLike } = req.body

		// find logged-in user in database
		const currentUser = await User.findOne({
			username: username
		})

		// push new liked game to the likedGames array
		likedGames.push(newLike)
		
		// update the logged-in users likedGames array
		req.session.user.likedGames = likedGames
		
		// update the logged-in users likedGames array
		await currentUser.updateOne({
			'likedGames': likedGames
		})

		// redirect back to games page
		res.redirect('/games')
	} catch(err) {
		return err
	}
}

export default postLike