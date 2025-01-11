import { Router } from 'express';
import { createVolqueta, getAllVolquetasForms, getVolqueta, putVolqueta, deleteVolqueta } from '../controllers/volquetas.controller.js';
import { generarNumeroPlanilla } from '../libs/GenRandomControlNumb.js';
const router = Router();
router.get('/gennumber', (req, res) => {
  const numbOfForm = generarNumeroPlanilla();
  res.json({
    numbOfForm
  });
});
router.post('/addplanilla', createVolqueta);
router.get('/allforms', getAllVolquetasForms);
router.get('/', getVolqueta);
router.patch('/edit/:id', putVolqueta);
router.patch('/edit/', putVolqueta);
router.delete('/:id', deleteVolqueta);
export default router;