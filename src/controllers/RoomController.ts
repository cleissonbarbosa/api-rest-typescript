import { Request, Response } from 'express'
import ApiError, { errors } from '../exceptions/ApiError'
import { prisma } from '../prisma'

export class RoomController {
	async create(req: Request, res: Response) {
		const { name, description } = req.body
		const newRoom = prisma.rooms.create({ 
			data: { name, description }
		})

		return res.status(201).json(newRoom)
	}

	async createVideo(req: Request, res: Response) {
		const { title, url } = req.body
		const { idRoom } = req.params

		const room = await prisma.rooms.findUniqueOrThrow({ 
			where:{ id: Number(idRoom) }
		})

		if ( ! room ) {
			throw new ApiError("Aula não existe", errors.NotFound)
		}

		const newVideo = prisma.videos.create({
			data: {
				title,
				url,
				room_id: Number(idRoom)
			}
		})

		return res.status(201).json(newVideo)

	}

	async roomSubject(req: Request, res: Response) {
		const { subject_id } = req.body
		const { idRoom } = req.params
		const room = await prisma.rooms.findUniqueOrThrow({ 
			where: { 
				id: Number(idRoom)
			}
		})

		if ( ! room ) {
			throw new ApiError("Aula não existe", errors.NotFound)
		}

		const subject = await prisma.subjects.findUniqueOrThrow({
			where:{
				id: Number( subject_id ),
			}
		})

		if ( !subject ) {
			throw new ApiError("Disciplina não existe", errors.NotFound)
		}

		const data = prisma.roomSubject.create({
			data: {
				room_id: Number(idRoom),
				subject_id: Number( subject_id )
			}
		})

		return res.status(204).json(data)
	}

	async list(req: Request, res: Response) {
		const rooms = await prisma.rooms.findMany({
			include: {
				room_subject:true,
				videos: true,
			},
		})

		return res.json(rooms)
	}
}
