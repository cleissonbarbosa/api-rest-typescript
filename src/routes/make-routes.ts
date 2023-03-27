import { Router } from 'express';

export const router = Router();

export default function ( ...routers: Array<Router> ) : Router {
    routers.map( (r) => router.use( r ) )
    return router;
}