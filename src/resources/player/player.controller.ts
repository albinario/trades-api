import { Request, Response } from 'express'
import Debug from 'debug'
import { Player } from './player.model'
import mongoose from 'mongoose'

const debug = Debug('trades:player.controller')

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
		const player = await Player.findOne({ id: playerId })

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

	} catch (err) {
		debug("Error thrown when creating player", err)

		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(400).send({
				status: 'fail',
				message: err.message
			})
		}

		res.status(500).send({
			status: 'error',
			message: "Error thrown when creating a new player"
		})
	}
}

export const update = async (req: Request, res: Response) => {
	const playerId = req.params.playerId

	try {
		const player = await Player.findOne({ id: playerId })
		
		if (!player) {
			return res.status(404).send({
				status: 'fail',
				message: "No player with this id"
			})
		}
		const noValues = !req.body.picker && !req.body.jersey && !req.body.pos && !req.body.teamAbbrev

		if (noValues) {
			await player.updateOne({ picker: '' })
		} else {
			if (req.body.picker) {
				await player.updateOne({ picker: req.body.picker })
			}
			
			if (req.body.jersey) {
				await player.updateOne({ jersey: req.body.jersey })
			}
			
			if (req.body.pos) {
				await player.updateOne({ pos: req.body.pos })
			}
			
			if (req.body.teamAbbrev) {
				await player.updateOne({ teamAbbrev: req.body.teamAbbrev })
			}
		}

		return res.status(200).send({
			status: 'success',
			data: {
				picker: noValues ? '' : (req.body.picker ? req.body.picker : player.picker),
				name: player.name,
				jersey: req.body.jersey ? req.body.jersey : player.jersey,
				pos: req.body.pos ? req.body.pos : player.pos,
				teamAbbrev: req.body.teamAbbrev ? req.body.teamAbbrev : player.teamAbbrev,
				id: player.id
			}
		})

		const err = new Error()

	} catch (err) {
		debug("Error thrown when updating player", err)

		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(400).send({
				status: 'fail',
				message: err.message
			})
		}

		res.status(500).send({
			status: 'error',
			message: "Error thrown when updating player"
		})
	}
}