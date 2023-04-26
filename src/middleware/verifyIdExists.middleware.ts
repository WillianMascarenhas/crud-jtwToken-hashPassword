import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IUser } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../erros";

const verifyIdExists = async (req: Request, res: Response, next: NextFunction) => {
    const queryStrin: string = `
    SELECT *
    FROM
    users
    WHERE
    id = $1
    `

    const queryConfig: QueryConfig = {
        text: queryStrin,
        values: [req.params.id]
    }

    const queryResult: QueryResult<IUser> = await client.query(queryConfig)

    if(queryResult.rowCount == 0){
        throw new AppError("User not found", 404)
    }

    return next()
} 

export default verifyIdExists