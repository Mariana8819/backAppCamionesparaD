import { Router } from 'express';
import { createDocumento, getAllDocumento, putDocumento, deleteDocumento } from '../controllers/documentos.controller.js';
const router = Router();
router.post('/newdoc',
// TokenValidation,
createDocumento);
router.get('/', getAllDocumento);
router.put('/:id', putDocumento);
router.delete('/:id', deleteDocumento);
export default router;