import { InferModel, sql } from 'drizzle-orm'
import { datetime, int, mysqlSchema, varchar } from 'drizzle-orm/mysql-core'

export const mySchema = mysqlSchema( "drizzle_crud_mysql" )

export const TodoSchema = mySchema.table( 'todo', {
  id       : int( "id" ).primaryKey().autoincrement(),
  title    : varchar( 'title', { length: 50 } ).notNull(),
  year     : int( 'year' ).notNull(),
  createdAt: datetime( 'created_at' )
  .default( sql`CURRENT_TIMESTAMP` )
  .notNull(),
  updatedAt: datetime( 'updated_at' )
  .default( sql`CURRENT_TIMESTAMP ON
  UPDATE CURRENT_TIMESTAMP` )
  .notNull(),
} )
export type IRoleSelect = InferModel<typeof TodoSchema, 'select'>
export type IRoleCreate = InferModel<typeof TodoSchema, 'insert'>
