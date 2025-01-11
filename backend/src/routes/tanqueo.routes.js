import { Router } from "express";
import {
    createTanqueo,
    getAllTanqueos,
    getTanqueoById,
    updateTanqueo,
    deleteTanqueo,
} from '../controllers/tanqueos.controller.js';

const router = Router();

router.post(
  "/create",
  createTanqueo
);

router.get(
  "/",
  getAllTanqueos
);

router.get(
  "/:id",
  getTanqueoById
);

router.patch(
  "/update/:id",
  updateTanqueo
);

router.delete(
  "/delete/:id",
  deleteTanqueo
);

export default router;
