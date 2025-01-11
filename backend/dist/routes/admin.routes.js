import Router from 'express';
import { unlockUser } from '../authentication/disable_unlock/unlockUsers.controller.js';
import { disableUser } from '../authentication/disable_unlock/disableUsers.controller.js';
import { AuxAuthMiddleware } from '../middlewares/auxAuthMiddleware.js';
const router = Router();
router.post('/disable-user', AuxAuthMiddleware,
// Debe suprimirse para la producción...
disableUser);
router.post('/unlock-user', AuxAuthMiddleware,
// Debe suprimirse para la producción...
unlockUser);
export default router;