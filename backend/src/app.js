import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { AuxAuthMiddleware } from './middlewares/auxAuthMiddleware.js'; // Debe suprimirse para producción (Posiblemente quede)...
import { AuthAdmMiddleware } from './middlewares/authAdmMiddleware.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import cargaPesadaRoutes from './routes/cargaPesada.routes.js';
import documentosRoutes from './routes/documento.routes.js';
import licenciasRoutes from './routes/licencia.routes.js';
// import mecanicosRoutes from './routes/mecanico.routes.js';
import personasRoutes from './routes/persona.routes.js';
import tanqueosRoutes from './routes/tanqueo.routes.js';
import usuariosRoutes from './routes/usuario.routes.js';
import vehiculosRoutes from './routes/vehiculo.routes.js';
import volquetasRoutes from './routes/volqueta.routes.js';
import imageRoutes from './routes/image.routes.js';

dotenv.config(); // Asegura que cargue el archivo .env

// -------------------------------------------------------------------------------------------------- //
const isProduction = process.env.WORK_ENVIROPS === 'production';
const url = isProduction ? process.env.URL_DB : process.env.URLDB_DEV;
// -------------------------------------------------------------------------------------------------- //

const app = express();

// Settings...
app.set('port', process.env.PORT || 8585 || 3070);

// Configuración de express-session con connect-mongo...
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            // mongoUrl: process.env.URLDB_DEV, // Inhibir para producción...
            mongoUrl: url,
            // mongoUrl: process.env.URL_DB, // Activar para producción...
            collectionName: 'sessions',
            ttl: 2 * 24 * 60 * 60, // Opcional: Tiempo de vida de la sesión en segundos (aquí: 2 días)...
        }),
        cookie: {
            secure: false, // Cambia a true en producción con HTTPS...
            httpOnly: true, // Ayuda a prevenir ataques XSS...
            maxAge: 2 * 24 * 60 * 60 * 1000, // Opcional: Tiempo de vida de la cookie: 2 días en milisegundos...
        },
    }),
);

// Middlewares...
app.use(morgan('dev'));
// Aquí, la URL (Front local) debe sustituirse por la URL del Front desplegado...
app.use(
    cors({
        origin: process.env.URL_FRONTEND_DEV,
        // origin: process.env.URL_FRONTEND_PROD,
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes...
app.use('/api/auth', authRoutes);
//
app.use('/api/admin', AuxAuthMiddleware, adminRoutes);
//
app.use('/api/heavyload', cargaPesadaRoutes);
//
// Esta es una alternativa a cloudinary...
app.use('/api/images', AuxAuthMiddleware, imageRoutes);
//
app.use(
    '/api/documentos',
    AuxAuthMiddleware,
    AuthAdmMiddleware,
    documentosRoutes,
);
//
app.use(
    '/api/licencias',
    AuxAuthMiddleware,
    AuthAdmMiddleware,
    licenciasRoutes,
);
//
app.use('/api/personas', AuxAuthMiddleware, AuthAdmMiddleware, personasRoutes);
//
app.use(
    '/api/refueling', // antiguamente 'tanqueos'...
    AuxAuthMiddleware,
    tanqueosRoutes,
);
//
app.use('/api/usuarios', AuxAuthMiddleware, AuthAdmMiddleware, usuariosRoutes);
//
app.use(
    '/api/vehiculos',
    AuxAuthMiddleware,
    AuthAdmMiddleware,
    vehiculosRoutes,
);
//
app.use('/api/volquetas', AuxAuthMiddleware, volquetasRoutes);
//
app.use('/api/images', AuxAuthMiddleware, imageRoutes);

export default app;
