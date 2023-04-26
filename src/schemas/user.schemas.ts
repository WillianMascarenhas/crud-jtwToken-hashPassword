import { z } from "zod"

const userSchema =z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    admin: z.boolean().optional(),
    active: z.boolean()
})

const userSchemaRequest = userSchema.omit({ id: true, active: true })

const userSchemaResponse = userSchema.omit({ password: true })

const updateUserSchema = userSchema.omit({ id: true, admin: true, active: true }).partial()

const updateActiveSchema = userSchema.omit({ id: true, name: true, email: true, password: true, admin: true})

export { userSchema, userSchemaRequest, userSchemaResponse, updateUserSchema, updateActiveSchema }