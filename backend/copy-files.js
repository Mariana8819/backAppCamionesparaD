import fs from 'fs-extra';
import path from 'path';

// Define las rutas origen y destino
const paths = [
  { src: 'src/views', dest: 'dist/views' },
  { src: 'src/public', dest: 'dist/public' },
];

// Copia cada directorio de forma recursiva
paths.forEach(({ src, dest }) => {
  fs.copy(src, dest, { overwrite: true })
    .then(() => {
      console.log(`Copiado ${src} a ${dest}`);
    })
    .catch((err) => {
      console.error(`Error al copiar ${src} a ${dest}:`, err);
    });
});
