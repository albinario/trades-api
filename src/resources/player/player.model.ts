import { model, Schema, Document } from 'mongoose'

export interface IPlayer extends Document {
	picker: string
	name: string
	jersey: number
	pos: string
	teamAbbrev: string
	id: number
}

const PlayerSchema: Schema = new Schema<IPlayer>({
	picker: {
		type: String,
		maxlength: 1,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	jersey: {
		type: Number,
		required: true,
	},
	pos: {
		type: String,
		required: true,
		maxlength: 1,
	},
	teamAbbrev: {
		type: String,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
})

export const Player = model<IPlayer>('Player', PlayerSchema)
