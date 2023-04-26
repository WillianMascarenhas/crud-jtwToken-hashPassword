import { NextFunction, Request, Response } from "express";
import { AppError } from "../erros";
import jwt from "jsonwebtoken"
import "dotenv/config"

const verifyTokenExists = (req:Request, res: Response, next: NextFunction) =>{
    let token: string = req.headers.authorization as string

    if(!token){
        throw new AppError("Missing Bearer Token", 401)
    }

    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY!, (err: any, decode: any) =>{
        if(err){
            throw new AppError(err.message, 401)
        }
        res.locals.admin = decode.admin
    })  

   const decode = jwt.decode(token)
   res.locals.id = decode?.sub

    return next()
}

export default verifyTokenExists