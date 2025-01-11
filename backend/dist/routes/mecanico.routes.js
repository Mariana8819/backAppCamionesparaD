import { Router } from 'express';
import { createMecanico, getAllMecanicos, getMecanicoById, updateMecanico, deleteMecanico } from '../controllers/mecanicos.controller.js';
const router = Router();
router.post('/create', createMecanico);
router.get('/', getAllMecanicos);
router.get('/:id', getMecanicoById);
router.patch('/update/:id', updateMecanico);
router.delete('/delete/:id', deleteMecanico);
export default router;