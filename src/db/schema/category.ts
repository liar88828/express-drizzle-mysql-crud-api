import { InferModel, sql } from "drizzle-orm";
import { datetime, decimal, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { BlogToCategorySchema } from "./blog-to-category";

const question = "https://media.istockphoto.com/id/1344687455/id/vektor/pertanyaan-menyanyikan-ikon-datar-ilustrasi-vektor-terisolasi-pada-latar-belakang-putih.jpg?s=612x612&w=0&k=20&c=7fiPX_7gnL13O_V5OtrVm9y4d_M9U5YyR0iUc52782E="

export const CategorySchema = mysqlTable( "category", {
  slug: varchar( "slug", { length: 25 } ).notNull().primaryKey(),
  title: varchar( "title", { length: 255 } ).notNull(),
  thumbnail: varchar( "thumbnail", { length: 255 } ).notNull().default( question ),
  rating: decimal( "rating", { precision: 2, scale: 1 } ).default( "0.0" ).notNull(),//2,5
  createdAt: datetime( "created_at" ).default( sql`CURRENT_TIMESTAMP` ).notNull(),
  // updatedAt2: timestamp( "updated_at2" ).defaultNow().onUpdateNow().notNull(),
} )

export type ICateGory = InferModel<typeof CategorySchema, "select">
export type ICateGoryCreate = InferModel<typeof CategorySchema, "insert">
