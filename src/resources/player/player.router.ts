import express from 'express'
import * as playerController from './player.controller'

const router = express.Router()

router.get('/', playerController.index)

router.get('/:playerId', playerController.show)

router.post('/', playerController.store)

router.patch('/:playerId', playerController.update)

export default router
