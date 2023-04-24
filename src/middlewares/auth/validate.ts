import Debug from 'debug'
import { Request, Response, NextFunction } from 'express'

const debug = Debug('trades:validate')

export const validate = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization) {
		debug("Authorization header missing")

		return res.status(401).send({
			status: 'fail',
			data: "Authorization header missing"
		})
	}

	if (req.headers.authorization.split(' ')[1] !== process.env.ACCESS_TOKEN_SECRET) {
		debug("Authorization failed, wrong password")

		return res.status(401).send({
			status: 'fail',
			data: "Authorization failed"
		})
	}

	next()
}
