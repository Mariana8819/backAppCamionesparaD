// import puppeteer from 'puppeteer';
// import { convert } from 'pdf-poppler';
// import fs from 'fs';
// import path from 'path';
// import HeavyLoadImage from '../models/HeavyLoadImage.js';

// export async function heavyLoadTemplate(data) {
//     try {
//         // Cargar el logo como base64...
//         const logoPath = path.resolve(
//             __dirname,
//             '../icons/yadiraLogoColor2.png',
//         );
//         const logoBase64 = fs.readFileSync(logoPath, 'base64');
//         const logoDataURL = `data:image/png;base64,${logoBase64}`;

//         // Se genera el PDF con 'puppeteer'...
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();

//         // Formatear la fecha en formato dd-mm-yyyy...
//         const FormattedDateIni = new Date(data.fecha_inicio).toLocaleDateString(
//             'es-VE',
//             {
//                 day: '2-digit',
//                 month: '2-digit',
//                 year: 'numeric',
//             },
//         );
//         //
//         const FormattedDateEnd = new Date(data.fecha_final).toLocaleDateString(
//             'es-VE',
//             {
//                 day: '2-digit',
//                 month: '2-digit',
//                 year: 'numeric',
//             },
//         );

//         // Contenido HTML con estilos CSS
//         const content = `
//             <html>
//                 <head>
//                     <style>
//                     body {
//                         font-family: Arial, sans-serif;
//                         margin: 20px;
//                         padding: 0;
//                     }
//                     h1 {
//                         text-align: center;
//                         font-size: 24px;
//                         margin-bottom: 20px;
//                         color: #333;
//                     }
//                     .header {
//                         display: flex;
//                         justify-content: space-between;
//                         align-items: center;
//                     }
//                     .logo {
//                         width: 20%;
//                         height: 20%;
//                     }
//                     .planilla {
//                         font-size: 14px;
//                         color: blue;
//                         text-align: right;
//                     }
//                     table {
//                         width: 100%;
//                         border-collapse: collapse;
//                         margin-top: 20px;
//                     }
//                     th, td {
//                         border: 1px solid #ddd;
//                         padding: 10px;
//                         text-align: left;
//                     }
//                     th {
//                         background-color: #f2f2f2;
//                         font-weight: bold;
//                     }
//                     .right-align {
//                         text-align: right;
//                     }
//                     .subtitulo .subtitulo2 {
//                         margin-top: 20px;
//                         font-size: 18px;
//                         font-weight: bold;
//                     }
//                     .subtitulo2 {
//                         margin-top: 45px;
//                     }
//                     .footer {
//                         text-align: center;
//                         margin-top: 50px;
//                         font-size: 14px;
//                         color: #555;
//                     }
//                     </style>
//                 </head>
//                 <body>
//                     <!-- Encabezado con logo y número de planilla -->
//                     <div class="header">
//                     <img src="${logoDataURL}" class="logo" alt="Logo">
//                     <div class="planilla">Planilla Nº: ${data.n_planilla}</div>
//                     </div>

//                     <h1>Carga Pesada</h1>

//                     <!-- Tabla de Detalles Generales -->
//                     <h2 class="subtitulo">Detalles Generales</h2>
//                     <table>
//                     <tr>
//                         <th>Ciudad Inicio</th>
//                         <th>Ciudad Destino</th>
//                         <th>Empresa</th>
//                     </tr>
//                     <tr>
//                         <td>${data.ciudad_inicio}</td>
//                         <td>${data.ciudad_destino}</td>
//                         <td>${data.empresa}</td>
//                     </tr>
//                     <tr>
//                         <th>Conductor</th>
//                         <th>Vehículo Placas</th>
//                         <th>Valor Flete</th>
//                     </tr>
//                     <tr>
//                         <td>${data.conductor_cedula}</td>
//                         <td>${data.placa_vehiculo}</td>
//                         <td>${data.valor_flete}</td>
//                     </tr>
//                     <tr>
//                         <th>Fecha Inicio</th>
//                         <th>Fecha Final</th>
//                         <th></th> <!-- Columna vacía para ajustar el formato -->
//                     </tr>
//                     <tr>
//                         <td>${FormattedDateIni}</td>
//                         <td>${FormattedDateEnd}</td>
//                         <td></td>
//                     </tr>
//                     </table>

//                     <!-- Tabla de Datos Adicionales -->
//                     <h2 class="subtitulo2">Datos Adicionales</h2>
//                     <table>
//                     <tr>
//                         <th>Anticipo Empresa</th>
//                         <td class="right-align">${data.anticipo_empresa}</td>
//                     </tr>
//                     <tr>
//                         <th>ACPM</th>
//                         <td class="right-align">${data.acpm}</td>
//                     </tr>
//                     <tr>
//                         <th>Peaje</th>
//                         <td class="right-align">${data.peaje}</td>
//                     </tr>
//                     <tr>
//                         <th>Mantenimiento</th>
//                         <td class="right-align">${data.mantenimiento}</td>
//                     </tr>
//                     <tr>
//                         <th>Mecánico</th>
//                         <td class="right-align">${data.mecanico}</td>
//                     </tr>
//                     <tr>
//                         <th>Otros</th>
//                         <td class="right-align">${data.otros}</td>
//                     </tr>
//                     <tr>
//                         <th>Total A + F</th>
//                         <td class="right-align">${data.total_anticipos_fletesPagados}</td>
//                     </tr>
//                     <tr>
//                         <th>Total Gastos</th>
//                         <td class="right-align">${data.total_gastos}</td>
//                     </tr>
//                     <tr>
//                         <th>Total saldo</th>
//                         <td class="right-align">${data.total_saldo}</td>
//                     </tr>
//                     </table>

//                     <div class="footer">
//                     <p>Este es un documento generado electrónicamente</p>
//                     </div>
//                 </body>
//             </html>
//         `;

//         await page.setContent(content);

//         // Guardar el PDF temporalmente...
//         const pdfDir = path.resolve(__dirname, '../pdf-excel');
//         const pdfPath = path.join(
//             pdfDir,
//             `recibo_cargaPesada_${data.n_planilla}.pdf`,
//         );

//         if (!fs.existsSync(pdfDir)) {
//             fs.mkdirSync(pdfDir);
//         }

//         await page.pdf({
//             path: pdfPath, // Guardar PDF localmente
//             format: 'A4',
//             printBackground: true,
//         });

//         await browser.close();

//         // Convertir PDF a imagen PNG usando pdf-poppler...
//         const options = {
//             format: 'png', // Formato de salida...
//             out_dir: pdfDir, // Carpeta de salida...
//             out_prefix: `recibo_cargaPesada_${data.n_planilla}`, // Prefijo de la imagen...
//             page: null, // Convertir todas las páginas...
//         };

//         console.log('Ruta del PDF generado:', pdfPath);
//         console.log('Contenido de las opciones:', options);

//         // Realiza la conversión
//         const result = await convert(pdfPath, options).catch((err) => {
//             throw new Error(`Error al convertir el PDF: ${err.message}`);
//         });

//         console.log('Resultado de la conversión:', result);

//         // Verifica si la conversión fue exitosa
//         const convertedFiles = fs
//             .readdirSync(pdfDir)
//             .filter(
//                 (file) =>
//                     file.startsWith(options.out_prefix) &&
//                     file.endsWith('.png'),
//             );

//         if (convertedFiles.length === 0) {
//             throw new Error('La conversión de PDF a imagen falló');
//         }

//         const imagePath = path.join(pdfDir, convertedFiles[0]);

//         // Leer la imagen generada...
//         const imageBuffer = fs.readFileSync(imagePath);

//         const newImage = new HeavyLoadImage({
//             heavyload: data._id,
//             image_data: imageBuffer,
//             mimeType: 'image/png',
//         });

//         await newImage.save();
//         console.log('Imagen guardada correctamente en MongoDB');

//         // Eliminar archivos temporales
//         fs.unlinkSync(pdfPath);
//         fs.unlinkSync(imagePath);
//     } catch (error) {
//         console.error('Error durante la conversión:', error.message);
//         console.error(error.stack); // Esto te mostrará detalles más específicos sobre dónde ocurre el error
//     }
// }
