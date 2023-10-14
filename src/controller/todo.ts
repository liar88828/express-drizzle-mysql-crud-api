import { ErrorRequestHandler, Request, Response } from 'express';
import { db } from '../db/config/config';
import { eq } from 'drizzle-orm';
import { IRoleSelect, TodoSchema } from '../db/schema/todo';

 

export class TodoController {

  // private  tryCatch(data){
  //   try {
  //
  //   }catch ( e :ErrorRequestHandler) {
  //     console.error(e)
  //     console.error(e.message)
  //
  //   }
  // }

  async findAll( req: Request, res: Response ) {
    try {
      const data = await db.query.TodoSchema.findMany()
      return res.json( { status: 200, data: data } )
    }
    catch ( e: ErrorRequestHandler | any ) {
      console.error( e )
      console.error( e.message )
      return res.json( { status: 500 } )

    }

  }

  async findOne( req: Request, res: Response ) {
    try {
      const id = req.params.id
      console.log( id )
      // const data = db.query.TodoSchema.findFirst( { where: eq( TodoSchema.id, id ) } )
      const data = await db.select()
                     .from( TodoSchema )
                     .where( eq( TodoSchema.id, Number( id ) )
                     ).limit(1)
      .then(rows=>rows)
      return res.json( { status: 201, data: data } )
    }

    catch ( e: ErrorRequestHandler | any ) {
      console.error( e )
      console.error( e.message )
      return res.json( { status: 500 } )
    }
  }

  async createOne( req: Request, res: Response ) {
    try {
      const { year, title }: IRoleSelect = req.body
      const id                           = Date.now().toString()
      const data                         = await db.insert( TodoSchema )
                                                   .values( { year, title, id: Number( id ) } )
      return res.json( { status: 201, data } )
    }
    catch ( e: ErrorRequestHandler | any ) {
      console.error( e )
      console.error( e.message )
      return res.json( { status: 500 } )
    }
  }

  async updateOne( req: Request, res: Response ) {
    try {

      const { title, year }: IRoleSelect = req.body
      const id                           = req.params.id
      const data                         = await db.update( TodoSchema )
                                                   .set( { title, year } )
                                                   .where( eq( TodoSchema.id, Number( id ) ) )
      return res.json( { status: 203, data } )
    }
    catch ( e: ErrorRequestHandler | any ) {
      console.error( e )
      console.error( e.message )
      return res.json( { status: 500 } )
    }
  }

  async deleteOne( req: Request, res: Response ) {
    try {

      const id   = req.params.id
      console.log(id)
      const data = await db.delete( TodoSchema )
                           .where( eq( TodoSchema.id, Number( id ) ) )

      return res.json( { status: 201, data } )
    }
    catch ( e: ErrorRequestHandler | any ) {
      console.error( e )
      console.error( e.message )
      return res.json( { status: 500 } )
    }
  }
}

