import { Request, Response } from 'express'
import ApiError, { errors } from '../exceptions/ApiError'
import { prisma } from '../prisma'

export class SubjectController {
	async create(req: Request, res: Response) {
		const { name } = req.body

		if ( !name ) {
			throw new ApiError( "O nome é obrigatório", errors.BadRequest )
		}

		const newSubject = prisma.subjects.create({
			data: {
				name
			}
		})

		return res.status(201).json(newSubject)
	}
}
