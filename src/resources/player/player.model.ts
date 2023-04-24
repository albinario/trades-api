import { model, Schema, Document } from 'mongoose'

export interface IPlayer extends Document {
	name: string,
	picker: string,
	jersey: string,
	pos: string,
	team: number,
	id: number
}

const PlayerSchema: Schema = new Schema<IPlayer>({
	name: {
		type: String,
		required: true,
		trim: true
	},
	picker: {
		type: String
	},
	jersey: {
		type: String,
		required: true
	},
	pos: {
		type: String,
		required: true,
		maxlength: 1
	},
	team: {
		type: Number,
		required: true
	},
	id: {
		type: Number,
		required: true
	}
})

export const Player = model<IPlayer>('Player', PlayerSchema)
