import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../erros";

const verifyActiveLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const email: string = req.body.email

    const queryString: string =`
    SELECT * 
    FROM 
    users
    WHERE email = $1
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email]
    }

    const queryResult:QueryResult = await client.query(queryConfig)

    if(queryResult.rows[0].active == false){
        throw new AppError("User inactive", 404)
    }
    return next()
}

export default verifyActiveLogin