import { db } from "./db/conn"
import { UserSchema } from "./db/schema/users"


// type TypeUser = {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   role: "admin" | "user";
//   createdAt: Date;
//   updatedAt: Date;
// }

async function runQuery ()
{
  //   const result = await db.insert( UserSchema ).values( {
  //     name: "drizzle",
  //     email: "drizzle@gmail.com",
  //     password: "123",
  //   } )
  //   console.log( JSON.stringify( result, null, 2 ) );
  const result = await db.select().from( UserSchema );
  console.log( JSON.stringify( result, null, 2 ) );
}

try
{

  console.info( "succeeded" )
  runQuery()
} catch ( error )
{
  console.error( "error", error )
}