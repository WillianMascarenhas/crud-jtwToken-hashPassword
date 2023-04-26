import { z } from "zod"
import { requestLoginSchema, responseLoginSchema } from "../schemas/login.schemas"


type TLoginReguest = z.infer<typeof requestLoginSchema>

type TLoginResponse = z.infer<typeof responseLoginSchema>

export { TLoginReguest, TLoginResponse }