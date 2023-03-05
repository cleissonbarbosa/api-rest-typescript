import { Request, Response } from 'express'
import { userRepository } from '../repositories/userRepository'
import argon2 from 'argon2'
import { User } from '../entities/User'

export class UserController {
	async create(req: Request, res: Response) {
		const { email, password, role } : User = req.body

		if (!email || !password || !role) {
			return res.status(400).json({ message: 'bad request' })
		}

		try {
			const passwordEncrypted = await argon2.hash(password)
			const newUSer = userRepository.create({ email, password: passwordEncrypted, role })

			await userRepository.save(newUSer)

			return res.status(201).json(newUSer)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}
}
