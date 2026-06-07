import { Pool } from "pg"
import { config } from "../config"

export const pool =new Pool({
  connectionString : config.DATABASE_URL,
})

export  const initDB =async ()=>
{
  try{
        await pool.query(`
          CREATE TABLE IF NOT EXISTS users (
           id SERIAL PRIMARY KEY,
           name VARCHAR(100) NOT NULL,
           email VARCHAR(100) UNIQUE NOT NULL UNIQUE,
           password VARCHAR(100) NOT NULL,
           role VARCHAR(50) CHECK (role IN ('contributor','maintainer')) NOT NULL DEFAULT 'contributor',
           created_at TIMESTAMP DEFAULT NOW(),
           updated_at TIMESTAMP DEFAULT NOW())`)
           console.log('Database connected successfully')
  }
  catch(error){
    console.error('Error initializing database:', error)
  }
}
