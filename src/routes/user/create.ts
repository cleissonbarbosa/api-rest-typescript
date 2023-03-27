
import { UserController } from '../../controllers/UserController';
import { router } from '../make-routes';

const basePath = '/user';
export default router.post(`${basePath}/create`, new UserController().create)