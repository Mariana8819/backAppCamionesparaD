import { Router } from 'express';
import {
    createVehiculo,
    getAllVehiculos,
    getVehiculoById,
    getVehiculoByPlaca,
    assignDriverToVehicle,
    updateVehiculo,
    deleteVehiculo,
} from '../controllers/vehiculos.controller.js';

const router = Router();

router.post(
    '/create',
    createVehiculo,
);

router.get(
    '/',
    getAllVehiculos,
);

router.get(
    '/:id',
    getVehiculoById,
);

router.get(
    '/placa/:placa',
    getVehiculoByPlaca,
);

router.post(
    '/vehiculo/asignacion',
    assignDriverToVehicle,
);

router.patch(
    '/update/:id',
    updateVehiculo,
);

router.delete(
    '/delete/:id',
    deleteVehiculo,
);

export default router;
