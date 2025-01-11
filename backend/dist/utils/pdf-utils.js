import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import puppeteer from 'puppeteer';
import pug from 'pug';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const generatePDFAndImage = async (data, invoiceType) => {
  let invoiceFile = {};
  switch (invoiceType) {
    case 'tq':
      invoiceFile = {
        pugFile: 'refueling.pug',
        pdfFile: 'refueling.pdf',
        pngFile: 'refueling.png'
      };
      break;
    case 'cp':
      invoiceFile = {
        pugFile: 'heavyload.pug',
        pdfFile: 'heavyload.pdf',
        pngFile: 'heavyload.png'
      };
      break;
    case 'vt':
      invoiceFile = {
        pugFile: 'volqueta.pug',
        pdfFile: 'volqueta.pdf',
        pngFile: 'volqueta.png'
      };
      break;
    default:
      break;
  }
  const tempDir = path.join(__dirname, '../temp');
  const pdfPath = path.join(tempDir, invoiceFile.pdfFile);
  const imagePath = path.join(tempDir, invoiceFile.pngFile);

  // Crear el directorio si no existe
  fs.mkdirSync(tempDir, {
    recursive: true
  });

  // Renderizar el contenido HTML con Pug
  // const pugTemplatePath = path.join(__dirname, '../templates/refueling.pug');
  const pugTemplatePath = path.join(__dirname, `../templates/${invoiceFile.pugFile}`);
  const renderedHTML = pug.renderFile(pugTemplatePath, data);

  // Crear el PDF usando Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Configurar el contenido de la página
  await page.setContent(renderedHTML, {
    waitUntil: 'load'
  });

  // Generar el PDF
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: {
      top: '20px',
      bottom: '20px',
      left: '20px',
      right: '20px'
    }
  });

  // Capturar la imagen del PDF
  await page.screenshot({
    path: imagePath,
    fullPage: true
  });
  await browser.close();

  // Leer los archivos generados como buffers
  const pdfBuffer = fs.readFileSync(pdfPath);
  const imageBuffer = fs.readFileSync(imagePath);

  // Eliminar los archivos temporales
  fs.unlinkSync(pdfPath);
  fs.unlinkSync(imagePath);
  return {
    pdfBuffer,
    imageBuffer
  };
};