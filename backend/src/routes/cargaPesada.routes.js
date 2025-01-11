import { Router } from 'express';
import {
    createHeavyLoadForm,
    getAllHeavyLoadForms,
    getHeavyLoadByFormNumber,
    getHeavyLoadByFormID,
} from '../controllers/cargaPesada.controller.js';
import { generarNumeroPlanilla } from '../libs/GenRandomControlNumb.js';

const router = Router();

router.get(
    '/gennumber',
    (req, res) => {
        const numbOfForm = generarNumeroPlanilla();
        res.json({ numbOfForm });
    },
);

router.post(
    '/addheavyloadform',
    createHeavyLoadForm,
);

router.get(
    '/',
    getAllHeavyLoadForms,
);

router.get(
    '/planilla/:n_planilla',
    getHeavyLoadByFormNumber,
);

router.get(
    '/planillaid/:_id',
    getHeavyLoadByFormID,
);

export default router;
