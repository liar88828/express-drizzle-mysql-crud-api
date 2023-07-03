
import { InferModel, sql } from "drizzle-orm"
import { datetime, int, mysqlEnum, mysqlTable, uniqueIndex, varchar } from "drizzle-orm/mysql-core"
import { RoleSchema } from "./role"
export const UserSchema = mysqlTable( "users", {
  id: varchar( "id", { length: 50 } ).primaryKey(),
  fullName: varchar( "full_name", { length: 100 } ).notNull(),
  email: varchar( "email", { length: 100 } ).notNull(),
  password: varchar( "password", { length: 100 } ).notNull(),
  age: int( "age" ).notNull(),
  gender: mysqlEnum( "gender", [ "male", "female" ] ).notNull(),
  roleSlug: varchar( "role_slug", { length: 25 } ).notNull().references( () => RoleSchema.slug ),

  createdAt: datetime( "created_at" ).default( sql`CURRENT_TIMESTAMP` ).notNull(),
}, ( userSchema ) =>
{
  return { email_unique_idx: uniqueIndex( "slug_unique_idx" ).on( userSchema.email ) }
} )


export type IUser = InferModel<typeof UserSchema, "select">
export type IUserCreate = InferModel<typeof UserSchema, "insert">