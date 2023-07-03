import { InferModel, sql } from "drizzle-orm";
import { boolean, datetime, decimal, index, int, mysqlTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { UserSchema } from "./users";
import { BlogToCategorySchema } from "./blog-to-category";

const question = "https://media.istockphoto.com/id/1344687455/id/vektor/pertanyaan-menyanyikan-ikon-datar-ilustrasi-vektor-terisolasi-pada-latar-belakang-putih.jpg?s=612x612&w=0&k=20&c=7fiPX_7gnL13O_V5OtrVm9y4d_M9U5YyR0iUc52782E="

export const BlogSchema = mysqlTable( "blogs", {
  id: int( "id" ).autoincrement().primaryKey(),
  title: varchar( "title", { length: 255 } ).notNull(),
  slug: varchar( "slug", { length: 25 } ).notNull(),
  content: varchar( "content", { length: 2000 } ).notNull(),
  thumbnail: varchar( "thumbnail", { length: 255 } ).notNull().default( question ),
  published: boolean( "published" ).default( true ).notNull(),
  views: int( "views" ).default( 0 ).notNull(),
  rating: decimal( "rating", { precision: 2, scale: 1 } ).default( "0.0" ).notNull(),//2,5
  createdAt: datetime( "created_at" ).default( sql`CURRENT_TIMESTAMP` ).notNull(),
  updatedAt: datetime( "updated_at" ).default( sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` ).notNull(),
  // updatedAt2: timestamp( "updated_at2" ).defaultNow().onUpdateNow().notNull(),
  authorId: varchar( "author_id", { length: 50 } ).notNull().references( () => UserSchema.id ),
  blogId: int( "blog_id" ).notNull().references( () => BlogToCategorySchema.blogId )
}, ( blogSchema ) =>
{
  return {
    slug_unique_idx: uniqueIndex( "slug_unique_idx" ).on( blogSchema.slug ),
    published_idx: index( "published_idx" ).on( blogSchema.published )
  }
} )

export type IBlog = InferModel<typeof BlogSchema, "select">
export type IBlogCreate = InferModel<typeof BlogSchema, "insert">
