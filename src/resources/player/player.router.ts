import express from 'express'
const router = express.Router()
import * as playerController from './player.controller'

router.get('/', playerController.index)

router.get('/:playerId', playerController.show)

router.post('/', playerController.store)

export default router
