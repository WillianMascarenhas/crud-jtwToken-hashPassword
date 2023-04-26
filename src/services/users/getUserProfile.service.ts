import { QueryConfig, QueryResult } from "pg"
import { TUserResponse } from "../../interfaces/user.interface"
import { client } from "../../database"
import { userSchemaResponse } from "../../schemas/user.schemas"

const getUserProfileService = async (id:number): Promise<TUserResponse> =>{
    console.log(id)

    const queryString: string = `
    SELECT *
    FROM  
    users
    WHERE id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult<TUserResponse> = await client.query(queryConfig)

    const user = userSchemaResponse.parse(queryResult.rows[0])

    return user

}

export default getUserProfileService 