const mongoose = require('mongoose');
const User = require('../../models/User')
const argon2 = require('argon2')

exports.databaseTest = async (request, response) => {

	const ready_state = mongoose.connection.readyState

	response.json(ready_state)
}

exports.databaseCreateUser = async (request, response) => {

	let user = request.body.user

	const name = user.name
	let password = user.password
	password = await argon2.hash(password)

	user = await User.create({
		name,
		password
	})

	await response.json(user)
}