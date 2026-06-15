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
          email VARCHAR(100) UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role VARCHAR(50) CHECK (role IN ('contributor','maintainer')) NOT NULL DEFAULT 'contributor',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
  )  
`);

await pool.query(`
          CREATE TABLE IF NOT EXISTS issues(
          id SERIAL PRIMARY KEY,
          title VARCHAR(150) NOT NULL,
          description TEXT NOT NULL CHECK (CHAR_LENGTH(description) >= 20),
          type VARCHAR(20) CHECK (type IN ('bug', 'feature_request')) NOT NULL,
          status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
          reporter_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
  )
`);

console.log('Database initialized successfully')
  }
  catch(error){
    console.error('Error initializing database:', error)
  }
}
