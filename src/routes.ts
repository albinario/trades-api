import express from 'express'
import playerRouter from './resources/player/player.router'

const router = express.Router()

router.get('/', async (req, res) => {
	res.send({
		message: 'This is the Trades API',
	})
})

router.use('/players', playerRouter)

export default router
