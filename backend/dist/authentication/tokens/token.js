"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Importamos jsonwebtoken para trabajar con tokens JWT.
// Importamos dotenv para cargar variables de entorno desde un archivo .env.

_dotenv["default"].config(); // Configuramos dotenv para acceder a las variables definidas en el archivo .env.

var SECK = process.env.SKEY_TOKEN; // Recuperamos la clave secreta para firmar los tokens desde las variables de entorno.

// Función para generar un token JWT basado en la información del usuario guardado (savedUser).
var token = exports.token = function token(savedUser) {
  // Definimos el payload del token, que contiene los datos que queremos incluir de forma segura.
  var payload = {
    _id: savedUser.id,
    // ID único del usuario.
    rol: savedUser.roles // Roles asignados al usuario (por ejemplo, 'admin', 'user', etc.).
  };

  // Retornamos una Promesa porque `jwt.sign` es asíncrono con el callback.
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].sign(payload,
    // Datos a incluir en el token.
    SECK,
    // Clave secreta para firmar el token.
    {
      expiresIn: '1d'
    },
    // Opciones, como el tiempo de expiración del token ('1d' = 1 día).
    function (err, token) {
      // Callback que maneja el resultado de la firma.
      if (err) reject(err); // Si ocurre un error al firmar, se rechaza la Promesa.
      resolve(token); // Si todo es correcto, se resuelve la Promesa con el token generado.
    });
  });
};