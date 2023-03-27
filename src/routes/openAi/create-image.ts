import { IAController } from "../../controllers/IAController";
import { router } from '../make-routes';

const basePath = '/ia';

export default router.post( `${basePath}/create-img`, new IAController().createIMG )