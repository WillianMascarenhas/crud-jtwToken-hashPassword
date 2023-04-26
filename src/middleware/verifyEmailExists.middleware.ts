import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IUser, TUserRequest } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../erros";

const verifyEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<TUserRequest | void> => {
    const queryString: string = `
    SELECT * 
    FROM
    users
    WHERE
    email = $1
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.email]
    }

    const queryResult: QueryResult<IUser> = await client.query(queryConfig)

    if(queryResult.rowCount !==0){
        throw new AppError("E-mail already registered", 409)
    }

    return next()
}

export default verifyEmailExists