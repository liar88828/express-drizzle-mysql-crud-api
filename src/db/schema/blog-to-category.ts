import { InferModel } from "drizzle-orm";
import { int, mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";
import { CategorySchema } from "./category";

export const BlogToCategorySchema = mysqlTable( "blog_to_category", {
  blogId: int( "blog_id" ).notNull(),
  categorySlug: varchar( "slug", { length: 25 } ).notNull().references( () => CategorySchema.slug ),
},
  ( blogToCategorySchema ) =>
  {
    return {
      pk: primaryKey( blogToCategorySchema.blogId )
    }
  }
)

export type IBlogToCategory = InferModel<typeof BlogToCategorySchema, "select">
export type IBlogToCategoryCreate = InferModel<typeof BlogToCategorySchema, "insert">
