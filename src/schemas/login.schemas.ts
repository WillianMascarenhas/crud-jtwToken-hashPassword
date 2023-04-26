import { z } from "zod"

const requestLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
})

const responseLoginSchema = z.object({
    token: z.string()
})

export { requestLoginSchema, responseLoginSchema } 