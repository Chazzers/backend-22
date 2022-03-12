const addMultipleEventListeners = (array, interaction, callBack) => array.forEach(item => item.addEventListener(interaction, callBack))

export default addMultipleEventListeners