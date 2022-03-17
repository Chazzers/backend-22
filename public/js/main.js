// global variables
const likeButtons = document.querySelectorAll('.like-button')
const dislikeButtons = document.querySelectorAll('.dislike-button')
const likeButtonsArray = [...likeButtons]
const dislikeButtonsArray = [...dislikeButtons]

import addMultipleEventListeners from './addMultipleEventListeners.js'
import likeHandler from './likeHandler.js'
import dislikeHandler from './dislikeHandler.js'

if(likeButtons) {
	addMultipleEventListeners(likeButtonsArray, 'click', likeHandler)
}

if(dislikeButtons) {
	addMultipleEventListeners(dislikeButtonsArray, 'click', dislikeHandler)
}

