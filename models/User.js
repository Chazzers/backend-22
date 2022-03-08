import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	gender: String,
	age: Number,
	hobbies: Array,
	likedGames: Array
})

const User = mongoose.model('User', userSchema)

export default User