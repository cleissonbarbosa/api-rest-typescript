import { Request, Response } from 'express'
import ApiError, { errors } from '../exceptions/ApiError'
import { subjectRepository } from '../repositories/subjectRepository'

export class SubjectController {
	async create(req: Request, res: Response) {
		const { name } = req.body

		if ( !name ) {
			throw new ApiError( "O nome é obrigatório", errors.BadRequest )
		}

		const newSubject = subjectRepository.create({ name })

		await subjectRepository.save(newSubject)

		return res.status(201).json(newSubject)
	}
}
