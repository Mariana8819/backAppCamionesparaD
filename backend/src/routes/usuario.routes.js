import { Router } from 'express';
import {
    registrarUsuario,
    deleteUsuario,
    getAllUsuarios,
    getUsuario,
    updateUsuario,
} from '../controllers/usuarios.controller.js';
import { validateUser } from '../middlewares/validateUser.js';

const router = Router();

router.post(
    '/addusuario',
    validateUser,
    registrarUsuario,
);

router.get(
    '/',
    getAllUsuarios,
);

router.get(
    '/:usuario',
    getUsuario,
);

// Para realizar actualización del usuario proporcionando
// por URL el _id del mismo registrado...
router.patch(
    '/usuario/edit/:_id',
    updateUsuario,
);

router.patch(
    '/usuario/edit',
    updateUsuario,
);

router.delete(
    '/delete/:_id',
    deleteUsuario,
);

export default router;
