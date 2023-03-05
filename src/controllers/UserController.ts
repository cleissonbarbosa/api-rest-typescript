import { Request, Response } from 'express'
import { userRepository } from '../repositories/userRepository'
import argon2 from 'argon2'
import { User } from '../entities/User'
import ApiError, { errors } from '../exceptions/ApiError'

export class UserController {
	async create(req: Request, res: Response) {
		const { email, password, role } : User = req.body

		if (!email || !password || !role) {
			throw new ApiError( "Bad request", errors.BadRequest )
		}

		const passwordEncrypted = await argon2.hash(password)
		const newUSer = userRepository.create({ email, password: passwordEncrypted, role })

		await userRepository.save(newUSer)

		return res.status(201).json(newUSer)
	}
}
