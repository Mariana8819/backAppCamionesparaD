import { Router } from 'express';
import {
    createPersona,
    deletePersona,
    getAllPersonas,
    getPersonaByDNI,
    getPersonaByID,
    updatePersona,
} from '../controllers/personas.controller.js';
import { validatePerson } from '../middlewares/validatePerson.js';

const router = Router();

router.post(
    '/addpersona',
    validatePerson,
    createPersona,
);

router.get(
    '/',
    getAllPersonas,
);

router.get(
    '/personaced/:cedula',
    getPersonaByDNI,
);

router.get(
    '/personaid/:_id',
    getPersonaByID,
);

// Para realizar actualización del empleado proporcionando
// por URL el _id del mismo registrado...
router.patch(
    '/persona/edit/:_id',
    updatePersona,
);

// Para realizar actualización del empleado proporcionando
// por body el número de cédula...
router.patch(
    '/persona/edit',
    updatePersona,
);

// Para eliminar un empleado proporcionando
// por URL el _id del mismo registrado...
router.delete(
    '/persona/delete/:_id',
    deletePersona,
);

// Para eliminar un empleado proporcionando
// por body el número de cédula...
router.delete(
    '/persona/delete',
    deletePersona,
);

export default router;
