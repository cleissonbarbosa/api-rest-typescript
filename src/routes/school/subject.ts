import { SubjectController } from "../../controllers/SubjectController";
import { Router } from 'express';

const router = Router();
router.post('/subject', new SubjectController().create)

export default router