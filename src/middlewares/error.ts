import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError";

export const error = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response, 
    next: NextFunction
) => {
    return res
        .status( error.statusCode ?? 500 )
        .json({
            code: error.statusCode ?? 500,
            message: error.statusCode ? error.message : "Unexpected error" ,
        })
}