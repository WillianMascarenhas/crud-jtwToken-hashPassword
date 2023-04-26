import format from "pg-format"
import { TUpdateRequest, TUserResponse } from "../../interfaces/user.interface"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"
import { updateUserSchema, userSchemaRequest, userSchemaResponse } from "../../schemas/user.schemas"
import { AppError } from "../../erros"

const updateUserService = async (updateReq: TUpdateRequest, userId:number) =>{

    const queryString: string = format(`
    UPDATE
    users
    SET (%I) = ROW (%L)
    WHERE id = $1
    RETURNING *
    `,
    Object.keys(updateReq),
    Object.values(updateReq)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: QueryResult<TUpdateRequest> = await client.query(queryConfig)

    const userUpdate: TUserResponse = userSchemaResponse.parse(queryResult.rows[0])


    return userUpdate
}

export default updateUserService