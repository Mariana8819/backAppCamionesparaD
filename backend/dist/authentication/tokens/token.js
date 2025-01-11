import jwt from 'jsonwebtoken'; // Importamos jsonwebtoken para trabajar con tokens JWT.
import dotenv from 'dotenv'; // Importamos dotenv para cargar variables de entorno desde un archivo .env.

dotenv.config(); // Configuramos dotenv para acceder a las variables definidas en el archivo .env.

const SECK = process.env.SKEY_TOKEN; // Recuperamos la clave secreta para firmar los tokens desde las variables de entorno.

// Función para generar un token JWT basado en la información del usuario guardado (savedUser).
export const token = savedUser => {
  // Definimos el payload del token, que contiene los datos que queremos incluir de forma segura.
  const payload = {
    _id: savedUser.id,
    // ID único del usuario.
    rol: savedUser.roles // Roles asignados al usuario (por ejemplo, 'admin', 'user', etc.).
  };

  // Retornamos una Promesa porque `jwt.sign` es asíncrono con el callback.
  return new Promise((resolve, reject) => {
    jwt.sign(payload,
    // Datos a incluir en el token.
    SECK,
    // Clave secreta para firmar el token.
    {
      expiresIn: '1d'
    },
    // Opciones, como el tiempo de expiración del token ('1d' = 1 día).
    (err, token) => {
      // Callback que maneja el resultado de la firma.
      if (err) reject(err); // Si ocurre un error al firmar, se rechaza la Promesa.
      resolve(token); // Si todo es correcto, se resuelve la Promesa con el token generado.
    });
  });
};