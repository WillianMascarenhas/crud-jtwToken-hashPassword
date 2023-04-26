import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../erros";

const verifyActive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const id: number = parseInt(req.params.id)
    const queryString: string = `
    SELECT * 
    FROM
    users
    WHERE
    id = $1
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }
    const queryResult: QueryResult = await client.query(queryConfig)

    if(queryResult.rows[0].active === true){
        throw new AppError("User already active", 400)
    }

    return next()
}

export default verifyActive