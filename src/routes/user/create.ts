
import { UserController } from '../../controllers/UserController';
import { Router } from 'express';
import { verifyToken } from '../../middlewares/jwt-token';

const router = Router();
const basePath = '/user';

export default router.post(`${basePath}/create`, verifyToken, new UserController().create)