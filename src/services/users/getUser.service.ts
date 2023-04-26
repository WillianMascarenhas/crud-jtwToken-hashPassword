import { QueryResult } from "pg"
import { TUserResponse } from "../../interfaces/user.interface"
import { client } from "../../database"

const getUserService = async () => {

    const queryStrin: string = `
    SELECT 
    "id",
    "name",
    "email",
    "admin",
    "active"
    FROM
    users;
    `

    const queryResult: QueryResult<TUserResponse[]> = await client.query(queryStrin)


    return queryResult.rows
}

export default getUserService