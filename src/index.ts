import { web } from './app/server';

const port = 3000
web.listen( port, () => {
  console.log( `start with http://localhost:${ port }` )
} )