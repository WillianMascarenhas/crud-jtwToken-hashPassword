import { Request, Response } from "express";
import createUserService from "../services/users/createUsers.service";
import getUserProfileService from "../services/users/getUserProfile.service";
import { TUpdateRequest, TUserRequest, TUserResponse } from "../interfaces/user.interface";
import { updateUserSchema } from "../schemas/user.schemas";
import updateUserService from "../services/users/updateUser.service";
import getUserService from "../services/users/getUser.service";
import dellUserService from "../services/users/dellUser.service";
import userActive from "../services/users/putUserActive.service";

const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const userData: TUserRequest = req.body
    const createUser: TUserResponse  = await createUserService(userData)
    return res.status(201).json(createUser)
}

const getUserController = async (req: Request, res: Response): Promise<Response> => {
    const getUser = await getUserService()
    return res.json(getUser)
}

const getUserProfileController = async (req: Request, res: Response): Promise<Response> => {
    const id: number = res.locals.id
    const getUser = await getUserProfileService(id)
    return res.json(getUser)
}

const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    const updateData: TUpdateRequest = updateUserSchema.parse(req.body)
    const userId: number = parseInt(req.params.id)

    const updateUser: TUpdateRequest = await updateUserService(updateData, userId)

    return res.status(200).json(updateUser)
}

const dellUserController = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.id)
    const isAdmin: boolean = res.locals.admin

    dellUserService(userId, isAdmin)
    return res.status(204).json()
}

const updateActiveController = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.id)
    const updateUser: TUserResponse = await userActive(userId)
    return res.json(updateUser)
}

export { createUserController, getUserController, getUserProfileController, updateUserController, dellUserController, updateActiveController }