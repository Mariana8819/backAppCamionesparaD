import { Router } from 'express';
import { login, getDriverByDNI, getVehicleById } from '../authentication/login_out/login.controller.js';
import { logout } from '../authentication/login_out/logout.controller.js';
import { AuxAuthMiddleware } from '../middlewares/auxAuthMiddleware.js'; // Eliminar para prodcc...

const router = Router();
router.post('/login', login);
router.post('/logout', logout);
router.get('/checklogin', AuxAuthMiddleware, (req, res) => {
  res.json({
    isAuthenticated: true,
    user: {
      roles: req.session.roles
    }
  });
});

// *********** || Rutas auxiliares para el Front... || ************ //

router.get('/driverced/:cedula', getDriverByDNI);
router.get('/vehicleid/:id', getVehicleById);

// ***************************************************** //

export default router;