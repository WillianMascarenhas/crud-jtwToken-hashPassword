import { NextFunction, Request, Response } from "express";
import { AppError } from "../erros";

const verifyIdsIsValid = (req: Request, res: Response, next: NextFunction) => {

    const userId: number = parseInt(req.params.id)
    const idToken: number = parseInt(res.locals.id)
    const isAdmin: Boolean = res.locals.admin

    if(isAdmin){
        return next()
    }

    if(userId !== idToken){
        throw new AppError("Insufficient Permission", 403)
    }

    return next()

}

export default verifyIdsIsValid