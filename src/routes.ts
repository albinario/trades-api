import express from 'express'
import playerRouter from './resources/player/player.router'
import { validate } from './middlewares/auth/validate'

const router = express.Router()

router.get('/', async (req, res) => {
	res.send({
		message: "This is the Trades API",
	})
})

router.use('/players', validate, playerRouter)

export default router
