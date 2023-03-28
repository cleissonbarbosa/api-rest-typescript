import { SubjectController } from "../../controllers/SubjectController";
import { Router } from 'express';
import { verifyToken } from "../../middlewares/jwt-token";

const router = Router();
router.post('/subject', verifyToken, new SubjectController().create)

export default router