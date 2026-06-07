import dotenv from 'dotenv'
import express from 'express'
import type {   Application } from "express"




import { initDB } from './db/database'
import { userRoute } from './modules/users/user.route'

dotenv.config()

export const app : Application=express();


app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))


initDB()

app.use('/api/auth', userRoute)





