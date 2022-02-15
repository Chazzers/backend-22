const extractAllUsernames = (users) => {
	return users.map(user => user.username)
}

module.exports = extractAllUsernames