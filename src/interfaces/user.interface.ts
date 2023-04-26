import { z } from "zod"
import { updateActiveSchema, updateUserSchema, userSchema, userSchemaRequest, userSchemaResponse } from "../schemas/user.schemas";

type IUser = z.infer<typeof userSchema>

type TUserRequest = z.infer<typeof userSchemaRequest>;

type TUserResponse = z.infer<typeof userSchemaResponse>

type TUpdateRequest = z.infer<typeof updateUserSchema>

type TUpdateActive = z.infer<typeof updateActiveSchema>

export { IUser, TUserRequest, TUserResponse, TUpdateRequest, TUpdateActive };

 