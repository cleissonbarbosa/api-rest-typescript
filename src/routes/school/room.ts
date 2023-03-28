import { RoomController } from '../../controllers/RoomController';
import { Router } from 'express';
import cacheMiddleware from '../../middlewares/redis';
import { verifyToken } from '../../middlewares/jwt-token';

const router = Router();

router.get('/room', cacheMiddleware, new RoomController().list)
router.post('/room', verifyToken, new RoomController().create)
router.post('/room/:idRoom/create', verifyToken, new RoomController().createVideo )
router.post('/room/:idRoom/subject', verifyToken, new RoomController().roomSubject )

export default router