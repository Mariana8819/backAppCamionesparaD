import PDFDocument from "pdfkit"; // Librería para la generación de documentos PDF.
import path from "path"; // Módulo para trabajar con rutas de archivos.

export function plantillaVolquetas(volquetas, res) {
  // Se crea una instancia de PDFDocument para generar el PDF.
  try {
    const doc = new PDFDocument();

    // Configurar las cabeceras para que el navegador lo descargue
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Planilla.pdf`);

    // Pipe the PDF into the response
    doc.pipe(res);

    // Iterar sobre cada elemento de los datos recibidos para generar secciones del PDF.
    volquetas.forEach((volqueta) => {
      const {
        fecha,
        placa,
        conductor_cedula,
        cliente,
        volmts3,
        n_viajes,
        material,
        hora_inicio,
        hora_final,
        total_horas,
        km_inicial,
        km_final,
        total_km_dia,
        honorarios,
        lugar_de_cargue,
        lugar_de_descargue,
        observacion,
      } = volqueta;

      // Iterar sobre cada elemento de los datos recibidos para generar secciones del PDF.
      const logo = path.join(__dirname, "../icons/yadiraLogoColor2.png");
      doc.image(logo, 50, 3, { width: 200 });

      // Generar texto para el número de planilla y colocarlo en la esquina superior derecha.
      const planillaText = `Planilla N°:- ${volqueta.n_planilla}`;
      const textWidth = doc.widthOfString(planillaText);
      const textXPosition = doc.page.width - 50 - textWidth;

      doc
        .fontSize(8)
        .text(planillaText, textXPosition, 60)
        .moveDown()
        .moveTo(50, 100)
        .stroke();

      // Título centrado para los detalles del viaje.
      const titulo = "Detalles De Carga";
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
      const detallesGenerales = [
        [
          `Fecha: ${volqueta.fecha.toLocaleDateString()}`,
          `Placa: ${volqueta.placa.placa}`,
          `VOL.MTS3: ${volqueta.volmts3}`,
        ],
        [
          `Cliente: ${volqueta.cliente}`,
          `Conductor: ${volqueta.conductor.nombres}${volqueta.conductor.apellidos}`,
          `N_viajes: ${volqueta.n_viajes}`,
        ],
        [
          `Hora Inicio: ${volqueta.hora_inicio.toLocaleTimeString()}`,
          `Hora Final: ${volqueta.hora_final.toLocaleTimeString()}`,
          `Total horas: ${volqueta.total_horas}`,
        ],
        [
          `KM Inicial: ${volqueta.km_inicial}`,
          `KM Final: ${volqueta.km_final}`,
          `KM recorridos: ${volqueta.total_km_dia}`,
        ],
      ];

      // Crear una tabla para los detalles generales.
      detallesGenerales.forEach((row) => {
        row.forEach((text, index) => {
          const xPos = startX + index * cellWidth;
          doc.rect(xPos, currentY, cellWidth, cellHeight).stroke(); // Dibuja el contorno de la celda.
          doc.fontSize(10).text(text, xPos + 5, currentY + 5, {
            width: cellWidth - 10,
            align: "left",
          });
        });
        currentY += cellHeight;
      });

      // Título centrado para los valores adicionales.
      const datosAdicionalesTitulo = "Datos Adicionales";
      const datosAdicionalesTituloWidth = doc.widthOfString(
        datosAdicionalesTitulo
      );
      const datosAdicionalesTituloXPosition =
        (doc.page.width - datosAdicionalesTituloWidth) / 2;

      doc
        .fontSize(12)
        .text(
          datosAdicionalesTitulo,
          datosAdicionalesTituloXPosition,
          currentY + 20
        )
        .moveDown(1.5);

      currentY += 40;

      // Datos adicionales relacionados materiales y sitio de cargue y descargue.
      const datosAdicionales = [
        ["Material", volqueta.material],
        ["Lugar De Cargue", volqueta.lugar_de_cargue],
        ["Lugar De Descargue", volqueta.lugar_de_descargue],
        ["Honorarios", volqueta.honorarios],
        ["Observacion", volqueta.observacion],
      ];

      const datosCellWidth = 250; // Ancho de las celdas para los valores adicionales.

      // Crear tabla para los datos adicionales.
      datosAdicionales.forEach((row) => {
        row.forEach((text, index) => {
          const xPos = startX + index * datosCellWidth;
          doc.rect(xPos, currentY, datosCellWidth, cellHeight).stroke();
          doc.fontSize(10).text(text, xPos + 5, currentY + 5, {
            width: datosCellWidth - 10,
            align: "left",
          });
        });
        currentY += cellHeight; // Mover hacia abajo para la siguiente fila.
      });
      doc.end();
      // Finalizar el documento PDF.
    });
  } catch (error) {
    // Manejo de errores durante la generación del PDF.
    console.error(`Error generando la plantilla: ${error.message}`);
    res.status(500).json({ message: "Error generando el PDF", error });
  }
}
