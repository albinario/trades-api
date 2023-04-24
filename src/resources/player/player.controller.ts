import { Request, Response } from 'express'
import Debug from 'debug'
import { Player } from './player.model'
import mongoose from 'mongoose'

const debug = Debug('lmdb:player.controller')

export const index = async (req: Request, res: Response) => {
	try {
		const players = await Player.find().sort('name')

		res.send({
			status: 'success',
			data: players
		})

	} catch (err) {
		debug("Error thrown when finding players", err)

		res.status(500).send({
			status: 'error',
			message: "Error thrown when finding players"
		})
	}
}

export const show = async (req: Request, res: Response) => {
	const playerId = req.params.playerId

	try {
		const player = await Player.findById(playerId)

		if (!player) {
			return res.sendStatus(404)
		}

		res.send({
			status: 'success',
			data: player
		})

	} catch (err) {
		debug("Error thrown when finding player '%s': %o", playerId, err)

		res.status(500).send({
			status: 'error',
			message: "Error thrown when finding player"
		})
	}
}

export const store = async (req: Request, res: Response) => {
	try {
		const player = await new Player(req.body).save()

		res.status(201).send({
			status: 'success',
			data: player
		})

		const err = new Error()

	} catch (err) {
		debug("Error thrown when creating player", err)

		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(400).send({
				status: 'error',
				message: err.message
			})
		}

		res.status(500).send({
			status: 'error',
			message: "Error thrown when creating a new player"
		})
	}
}
