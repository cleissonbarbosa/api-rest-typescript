
import { UserController } from '../../controllers/UserController';
import { Router } from 'express';

const router = Router();
const basePath = '/user';

export default router.post(`${basePath}/create`, new UserController().create)