import User from '../../models/User.js'

const postLike = async (req, res) => {
	try {
		const { username, likedGames } = req.session.user

		const { newLike } = req.body

		const currentUser = await User.findOne({
			username: username
		})

		likedGames.push(newLike)

		await currentUser.updateOne({
			'likedGames': likedGames
		})

		res.redirect('/games')
	} catch(err) {
		return err
	}
}

export default postLike