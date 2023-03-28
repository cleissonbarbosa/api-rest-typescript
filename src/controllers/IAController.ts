import { Request, Response } from 'express'
import { CreateImageRequestSizeEnum } from 'openai/dist/api'
import ApiError, { errors } from '../exceptions/ApiError'
import * as OpenAi from './OpenAI'

interface AIrequestImageCreate {
	prompt: string
	size?: CreateImageRequestSizeEnum
}

export class IAController {
	async createIMG(req: Request, res: Response) {
		const { prompt, size } : AIrequestImageCreate = req.body

		if (!prompt) {
			throw new ApiError( "Bad request - prompt empty", errors.BadRequest )
		}

		if (size && !/^\d{3,4}x\d{3,4}$/.test(size) ) {
			throw new ApiError( "Bad request - size incorrect format", errors.BadRequest )
		}

		const response = await OpenAi.createImage( prompt, size )
	
		return res.status(201).json({result: response})
	}
}
