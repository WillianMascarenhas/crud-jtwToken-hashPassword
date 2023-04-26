import { QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../../interfaces/user.interface";
import { client } from "../../database";
import { userSchemaResponse } from "../../schemas/user.schemas";

const userActive = async (userId:number) => {

    const queryString0: string = `
    SELECT
    "active"
    FROM 
    users
    WHERE id = $1
    ` 

    const queryConfig0: QueryConfig = {
        text: queryString0,
        values: [userId]
    }

    const queryResult0: QueryResult<TUserResponse> = await client.query(queryConfig0)

    let value: boolean = !queryResult0.rows[0].active

    const queryString: string = `
    UPDATE users
    SET ("active") = ROW ($1)
    WHERE id = $2
    RETURNING * ;
    `

    const queryConfig:QueryConfig = {
        text: queryString,
        values: [value, userId]
    }

    const queryResult: QueryResult<TUserResponse> = await client.query(queryConfig)

    const update = userSchemaResponse.parse(queryResult.rows[0])

    return update
}

export default userActive