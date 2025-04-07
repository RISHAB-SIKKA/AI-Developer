import {Router} from 'express';
const router = Router();
import * as aiController from '../controller/ai.controller.js'
// import * as authMiddleWare from '../middleware/auth.middleware'


router.get('/get-result', aiController.getResult)

export default router;