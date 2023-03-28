import { Request, Response, Router } from 'express';
import { AuthenticateUser } from '../../controllers/AuthenticateUser';
import { generateToken } from '../../controllers/JWT';
import ApiError, {errors} from '../../exceptions/ApiError';

const router = Router();
const basePath = '/user';

export default router.post(`${basePath}/token`, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password) {
        throw new ApiError("Email or password invalid", errors.Unauthorized)
    }
    const auth = await AuthenticateUser(email, password)
    if(auth) {
        const payload = { email };
        const token = generateToken(payload);
        return res.json({ token })

    }
    throw new ApiError("Email or password invalid", errors.Unauthorized)
});