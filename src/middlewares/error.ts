import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError";

export const error = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response, 
    next: NextFunction
) => {
    if(req.method.toLocaleLowerCase() === 'post' ){
        return res
            .status( error.statusCode ?? 500 )
            .json({
                code: error.statusCode ?? 500,
                message: error.statusCode ? error.message : "Unexpected error",
                stack: process.env.APP_ENV === "local" ? error.stack : null
            })
    }

    return res
            .status( error.statusCode ?? 500 )
            .send(`
            <table>
                <tr>
                    <th>code</th>
                    <th>message</th>
                    ${process.env.APP_ENV === "local" ? "<th>stack</th>" : ""}
                </tr>
                <tr>
                    <td>${error.statusCode ?? 500}</td>
                    <td>${error.statusCode ? error.message : "Unexpected error"}</td>
                    ${process.env.APP_ENV === "local" ? "<td><code><pre>" + error.stack + "</pre></code></td>" : ""}
                </tr>
            </table>
            `)
}