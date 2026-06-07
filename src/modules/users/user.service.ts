import { pool } from "../../db/database"
import type { IUser } from "./user.interface"

const createUserIntoDB= async (payload : IUser)=>{
    const {name,email,password,role}= payload
    const result = await pool.query(`
        INSERT INTO users (name, email, password,role) VALUES ($1, $2, $3, $4) RETURNING *`,[name,email,password,role || 'contributor'])
      console.log(result)
      return result
}

export const userService={
    createUserIntoDB
}