import { NextFunction, Request, Response } from "express";
import { AppError } from "../erros";

const verifyIsAdmin = (req: Request, res: Response, next: NextFunction) =>{
    const isAdmin: Boolean = res.locals.admin
    const idToken: number = parseInt(res.locals.id)
    const userId: number = parseInt(req.params.id)

    if(userId == idToken){
        return next()
    }

    if(isAdmin === false){
        throw new AppError("Insufficient Permission", 403)
    }

    return next()
}

export default verifyIsAdmin