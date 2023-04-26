import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"

const dellUserService = async (userId:number, isAdmin: boolean): Promise<void> => {
    if(isAdmin === false){
        const queryString:string = `
        UPDATE
        users
        SET
        "active" = false
        WHERE id = $1;
        `
    
        const queryConfig: QueryConfig = {
            text: queryString,
            values: [userId]
        }
    
        const queryResult: QueryResult = await client.query(queryConfig)

        return queryResult.rows[0]
    }
    const queryString:string = `
    DELETE 
    FROM 
    users
    WHERE id = $1
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    return queryResult.rows[0]
}


export default dellUserService