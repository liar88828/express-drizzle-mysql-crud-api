import Express from 'express'
import { routerPublic } from '../router/todo';

export const web = Express()
web.use(Express.json())
web.use("/todo",routerPublic)
