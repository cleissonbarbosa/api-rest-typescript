import { IAController } from "../../controllers/IAController";
import { Router } from 'express';

const router = Router();
const basePath = '/ia';

export default router.post( `${basePath}/create-img`, new IAController().createIMG )