import dotenv from 'dotenv'
import express from 'express'
import type {  Request, Response, Application } from "express"
import { sendResponse } from "./utils/sendResponse"



import { initDB, pool } from './db/database'

dotenv.config()

export const app : Application=express();


app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))


initDB()
app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

app.post('/api/auth/signup',async (req : Request, res : Response) => {
  
  const {name,email,password,role}= req.body

  try {
    const result = await pool.query(`
    INSERT INTO users (name, email, password,role) VALUES ($1, $2, $3, $4) RETURNING *`,[name,email,password,role || 'contributor'])
  console.log(result)
  sendResponse(res,{
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: {
      id: result.rows[0].id,
      name : result.rows[0].name,
      email : result.rows[0].email,
      role : result.rows[0].role,
      created_at : result.rows[0].created_at,
      updated_at : result.rows[0].updated_at
    }
  })
    
  } catch (error : any) {
    sendResponse(res,{
    statusCode: 500,
    success: false,
    message: error.message,
    data : error
  })
  }
})


