import { Router } from 'express'
import { TodoController } from '../controller/todo';

export const routerPublic = Router()
const todo                = new TodoController()

routerPublic.get( '/', todo.findAll )
routerPublic.get( '/:id', todo.findOne )
routerPublic.post( '/', todo.createOne )
routerPublic.put( '/:id', todo.updateOne)
routerPublic.delete( '/:id', todo.deleteOne )
