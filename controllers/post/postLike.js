import User from '../../models/User.js'

const postLike = async (req, res) => {
	try {
		const users = await User.find({})
	} catch(err) {
		return err
	}
}

export default postLike