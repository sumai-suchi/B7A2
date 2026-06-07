import { pool } from "../../db/database"
import type { IUser } from "./user.interface"
import bcrypt from 'bcrypt'
const createUserIntoDB= async (payload : IUser)=>{
    const {name,email,password,role}= payload
    const hashedPassword = await bcrypt.hash(password , 10)
    const result = await pool.query(`
        INSERT INTO users (name, email, password,role) VALUES ($1, $2, $3, $4) RETURNING *`,[name,email,hashedPassword,role || 'contributor'])
      console.log(result)
      return result
}

export const userService={
    createUserIntoDB
}