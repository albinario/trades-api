import * as mongoose from 'mongoose'

export let db: mongoose.Mongoose

export const connect = async () => {
	if (db) return console.error('A connection is already established')

	if (!process.env.DATABASE_URL) {
		throw Error('No DATABASE_URL set in environment')
	}

	// prepare for Mongoose 7
	// mongoose.set('strictQuery', false)

	const connection = await mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as mongoose.ConnectOptions)

	db = connection

	console.log("🥳 We're connected to MongoDB Atlas!")
}
