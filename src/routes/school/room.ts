import { RoomController } from '../../controllers/RoomController';
import { Router } from 'express';

const router = Router();

router.post('/room', new RoomController().create)
router.get('/room', new RoomController().list)
router.post('/room/:idRoom/create', new RoomController().createVideo)
router.post('/room/:idRoom/subject', new RoomController().roomSubject)

export default router