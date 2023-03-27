import { SubjectController } from "../../controllers/SubjectController";
import { router } from '../make-routes';

router.post('/subject', new SubjectController().create)

export default router