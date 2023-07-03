import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool( {
  uri: "mysql://root:@localhost:3306/test"
} );

export const db = drizzle( poolConnection );