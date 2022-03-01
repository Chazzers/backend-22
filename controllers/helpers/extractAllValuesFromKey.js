const extractAllValuesFromKey = (array, key) => {
	return array.map(item => item[key])
}

export default extractAllValuesFromKey