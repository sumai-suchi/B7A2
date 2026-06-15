import { config } from "../../config"
import { pool } from "../../db/database"
import type { IUser } from "./user.interface"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const createUserIntoDB= async (payload : IUser)=>{
    const {name,email,password,role}= payload
    const hashedPassword = await bcrypt.hash(password , 10)
    const result = await pool.query(`
        INSERT INTO users (name, email, password,role) VALUES ($1, $2, $3, $4) RETURNING *`,[name,email,hashedPassword,role || 'contributor'])
        delete result.rows[0].password
      
      return result
}

const userLogin= async(email:string,password:string)=>{
    
    const userData= await pool.query(`
        SELECT * FROM users WHERE EMAIL=$1`,[email])
        
        if(userData.rows.length ===0)
        {
            throw new Error('Invalid Credentials')
        }

        const user = userData.rows[0]

        const matchPassword = await bcrypt.compare(password, user.password)

        if(!matchPassword){
            throw new Error('Invalid Credentials')
        }

        const jwtPayload={
            id:user.id,
            name:user.name,
            role:user.role
        }

       

        const accessToken= jwt.sign(jwtPayload,config.secret as string,{expiresIn:'1d'})
        delete user.password

        return {
            token : accessToken,
            user : user
        }
       
     
}




export const userService={
    createUserIntoDB,
    userLogin

}