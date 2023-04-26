import { Request, Response } from "express";
import loginUserService from "../services/login/loginUser.service";
import { TLoginReguest, TLoginResponse } from "../interfaces/login.interface";

const createLoginController = async (req: Request, res: Response): Promise<Response> => {
    const loginData:TLoginReguest = req.body

    const token:TLoginResponse = await loginUserService(loginData)
    return res.status(200).json(token)
}

export { createLoginController } 