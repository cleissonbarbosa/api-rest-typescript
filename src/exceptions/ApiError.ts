export enum errors {
    BadRequest = 400,
    NotFound = 404,
    InternalError = 500
}

export default class ApiError extends Error {
    public readonly statusCode: errors

    constructor(message: string, statusCode: errors) {
        super(message)
        this.statusCode = statusCode
    }
}