import { Router } from 'express';
import {
    getRefuelingImageByDNIAndInvoice,
    getVolquetaImageByDNIAndInvoice,
    geteHeavyLoadImageByDNIAndInvoice,
} from '../controllers/images.controller.js';

const router = Router();

router.get("/image/:cedula/:recibo", getRefuelingImageByDNIAndInvoice);

router.get('/image-volq/:cedula/:recibo', getVolquetaImageByDNIAndInvoice);

router.get(
    '/image-heavyload/:cedula/:recibo',
    geteHeavyLoadImageByDNIAndInvoice,
);

export default router;
