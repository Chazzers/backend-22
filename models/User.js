import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
	username: String,
	password: String,
	age: Number,
	hobbies: Array
})

const User = mongoose.model('User', userSchema)

export default User