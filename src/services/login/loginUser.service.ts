import { QueryConfig, QueryResult } from "pg"
import { TLoginReguest, TLoginResponse } from "../../interfaces/login.interface"
import { client } from "../../database"
import { AppError } from "../../erros"
import * as bcrypt from "bcryptjs"
import { IUser } from "../../interfaces/user.interface"
import  jwt  from "jsonwebtoken"
import "dotenv/config"

const loginUserService = async (loginData:TLoginReguest): Promise<TLoginResponse> => {

    const querySringEmail: string = `
    SELECT *
    FROM
    users
    where
    email = $1
    `

    const queryConfigEmail: QueryConfig = {
        text:querySringEmail,
        values: [loginData.email]
    }

    const queryResultEmail: QueryResult<IUser> = await client.query(queryConfigEmail)
    const user = queryResultEmail.rows[0]

    if(queryResultEmail.rowCount === 0){
        throw new AppError("Wrong email our password!", 500)
    }

    const comparePassword: boolean = await bcrypt.compare(loginData.password, user.password)

    if(!comparePassword){
        throw new AppError("Wrong email our password!", 500)
    }


    const token:string = jwt.sign(
        {
            admin: user.admin,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN,
            subject: user.id.toString()
        }
    )

    return { token }

} 

export default loginUserService
