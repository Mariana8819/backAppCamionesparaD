import { Router } from "express";
import { createLicencia, getLicencia, putLicencia, deleteLicencia,
// parser,
getLicenciaByID } from "../controllers/licencias.controller.js";
const router = Router();
router.post("/addlicencia", createLicencia);
router.get("/", getLicencia);
router.get('/licencia/:id', getLicenciaByID);
router.put("/edit/:id", putLicencia);
router.delete("/del/:id", deleteLicencia);
export default router;