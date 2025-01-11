import PDFDocument from "pdfkit"; // Librería para la generación de documentos PDF.
import path from "path"; // Módulo para trabajar con rutas de archivos.

export function plantillaCargaPesada(data, res) {
  // Se crea una instancia de PDFDocument para generar el PDF.
  try {
    const doc = new PDFDocument();

    // Configurar las cabeceras para que el navegador lo descargue
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Planilla.pdf`);

    // Redirigir la salida del PDF al flujo de respuesta HTTP.
    doc.pipe(res);

    // Iterar sobre cada elemento de los datos recibidos para generar secciones del PDF.
    data.forEach(item => {
      const {
        n_planilla,
        fecha_inicio,
        fecha_final,
        placa,
        conductor,
        ciudad_inicio,
        ciudad_destino,
        empresa,
        valor_flete,
        anticipo_empresa,
        anticipo_cliente,
        acpm,
        peaje,
        mantenimiento,
        mecanico,
        otros,
        total_anticipos_fletesPagados,
        total_gastos,
        total_saldo
      } = item;

      // Iterar sobre cada elemento de los datos recibidos para generar secciones del PDF.
      const logo = path.join(__dirname, "../icons/yadiraLogoColor2.png");
      doc.image(logo, 50, 3, {
        width: 200
      });

      // Generar texto para el número de planilla y colocarlo en la esquina superior derecha.
      const planillaText = `Planilla N°:- ${n_planilla}`;
      const textWidth = doc.widthOfString(planillaText);
      const textXPosition = doc.page.width - 50 - textWidth;
      doc.fontSize(8).text(planillaText, textXPosition, 60).moveDown().moveTo(50, 100).stroke();

      // Título centrado para los detalles del viaje.
      const titulo = "Detalles Del Viaje";
      const tituloWidth = doc.widthOfString(titulo);
      const tituloXPosition = (doc.page.width - tituloWidth) / 2;
      doc.fontSize(12).text(titulo, tituloXPosition, 120).moveDown(1.5);

      // Coordenadas iniciales y configuración para las celdas.
      const startX = 50;
      const startY = 130;
      const cellWidth = 170;
      const cellHeight = 20;
      let currentY = startY;

      // Datos generales del viaje.
      const detallesGenerales = [[`Ciudad Inicio: ${ciudad_inicio}`, `Ciudad Destino: ${ciudad_destino}`], [`Placa: ${placa.placa}`, `Empresa: ${empresa}`, `Conductor: ${conductor.nombres} ${conductor.apellidos}`, `Valor Flete: ${valor_flete}`], [`Fecha Inicio: ${new Date(fecha_inicio).toLocaleDateString()}`, `Fecha Final: ${new Date(fecha_final).toLocaleDateString()}`]];

      // Crear una tabla para los detalles generales.
      detallesGenerales.forEach(row => {
        row.forEach((text, index) => {
          const xPos = startX + index * cellWidth;
          doc.rect(xPos, currentY, cellWidth, cellHeight).stroke(); // Dibuja el contorno de la celda.
          doc.fontSize(10).text(text, xPos + 5, currentY + 5, {
            width: cellWidth - 10,
            align: "left"
          });
        });
        currentY += cellHeight;
      });

      // Título centrado para los valores adicionales.
      const datosAdicionalesTitulo = "Valores";
      const datosAdicionalesTituloWidth = doc.widthOfString(datosAdicionalesTitulo);
      const datosAdicionalesTituloXPosition = (doc.page.width - datosAdicionalesTituloWidth) / 2;
      doc.fontSize(12).text(datosAdicionalesTitulo, datosAdicionalesTituloXPosition, currentY + 20).moveDown(1.5);
      currentY += 40;

      // Datos adicionales relacionados con costos y anticipos.
      const datosAdicionales = [["Anticipo Empresa", anticipo_empresa], ["Anticipo Cliente", anticipo_cliente], ["ACPM", acpm], ["Peaje", peaje], ["Mantenimiento", mantenimiento], ["Mecanico", mecanico], ["Otros", otros], ["Total A-F", total_anticipos_fletesPagados], ["Total Gastos", total_gastos], ["Total Saldo", total_saldo]];
      const datosCellWidth = 250; // Ancho de las celdas para los valores adicionales.

      // Crear tabla para los datos adicionales.
      datosAdicionales.forEach(row => {
        row.forEach((text, index) => {
          const xPos = startX + index * datosCellWidth;
          doc.rect(xPos, currentY, datosCellWidth, cellHeight).stroke();
          doc.fontSize(10).text(text, xPos + 5, currentY + 5, {
            width: datosCellWidth - 10,
            align: "left"
          });
        });
        currentY += cellHeight; // Mover hacia abajo para la siguiente fila.
      });
      // Finalizar el documento PDF.
      doc.end();
    });
  } catch (error) {
    // Manejo de errores durante la generación del PDF.
    console.error(`Error generando la plantilla: ${error.message}`);
    res.status(500).json({
      message: "Error generando el PDF",
      error
    });
  }
}