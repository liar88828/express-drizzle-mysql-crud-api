import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import { TodoSchema } from '../schema/todo';

dotenv.config()

export const envConfig = {
  DATABASE_URL: process.env.DATABASE_URL,
}

const poolConnection = mysql.createPool( {
  uri: envConfig.DATABASE_URL,
} )

export const db = drizzle( poolConnection,
  {
    mode  : "default",
    schema: { TodoSchema }
  } )
