import fetch from 'node-fetch'

const getData = async (url) => {
	return await fetch(url)
		.then(res => res.json())
}

export default getData