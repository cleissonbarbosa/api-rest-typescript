import { Request, Response } from 'express'
import * as argon2 from 'argon2';
import ApiError, { errors } from '../exceptions/ApiError'
import { prisma } from '../prisma'
import { Users } from '@prisma/client';

export class UserController {
	async create(req: Request, res: Response) {
		const { email, password, role } : Users = req.body

		if (!email || !password || !role) {
			throw new ApiError( "Bad request", errors.BadRequest )
		}
		
		const passwordEncrypted = await argon2.hash(password)
		const newUSer = await prisma.users.create({
			data: {
				email,
				password: passwordEncrypted,
				role
			}
		})
		return res.status(201).json(newUSer)
	}
}
