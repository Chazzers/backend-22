const filterOnMultiValues = (array, filterValues, filterProp) => array.filter(item => filterValues.includes(item[filterProp]))

export default filterOnMultiValues