"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plantillaCargaPesada = plantillaCargaPesada;
var _pdfkit = _interopRequireDefault(require("pdfkit"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Librería para la generación de documentos PDF.
// Módulo para trabajar con rutas de archivos.

function plantillaCargaPesada(data, res) {
  // Se crea una instancia de PDFDocument para generar el PDF.
  try {
    var doc = new _pdfkit["default"]();

    // Configurar las cabeceras para que el navegador lo descargue
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=Planilla.pdf");

    // Redirigir la salida del PDF al flujo de respuesta HTTP.
    doc.pipe(res);

    // Iterar sobre cada elemento de los datos recibidos para generar secciones del PDF.
    data.forEach(function (item) {
      var n_planilla = item.n_planilla,
        fecha_inicio = item.fecha_inicio,
        fecha_final = item.fecha_final,
        placa = item.placa,
        conductor = item.conductor,
        ciudad_inicio = item.ciudad_inicio,
        ciudad_destino = item.ciudad_destino,
        empresa = item.empresa,
        valor_flete = item.valor_flete,
        anticipo_empresa = item.anticipo_empresa,
        anticipo_cliente = item.anticipo_cliente,
        acpm = item.acpm,
        peaje = item.peaje,
        mantenimiento = item.mantenimiento,
        mecanico = item.mecanico,
        otros = item.otros,
        total_anticipos_fletesPagados = item.total_anticipos_fletesPagados,
        total_gastos = item.total_gastos,
        total_saldo = item.total_saldo;

      // Iterar sobre cada elemento de los datos recibidos para generar secciones del PDF.
      var logo = _path["default"].join(__dirname, "../icons/yadiraLogoColor2.png");
      doc.image(logo, 50, 3, {
        width: 200
      });

      // Generar texto para el número de planilla y colocarlo en la esquina superior derecha.
      var planillaText = "Planilla N\xB0:- ".concat(n_planilla);
      var textWidth = doc.widthOfString(planillaText);
      var textXPosition = doc.page.width - 50 - textWidth;
      doc.fontSize(8).text(planillaText, textXPosition, 60).moveDown().moveTo(50, 100).stroke();

      // Título centrado para los detalles del viaje.
      var titulo = "Detalles Del Viaje";
      var tituloWidth = doc.widthOfString(titulo);
      var tituloXPosition = (doc.page.width - tituloWidth) / 2;
      doc.fontSize(12).text(titulo, tituloXPosition, 120).moveDown(1.5);

      // Coordenadas iniciales y configuración para las celdas.
      var startX = 50;
      var startY = 130;
      var cellWidth = 170;
      var cellHeight = 20;
      var currentY = startY;

      // Datos generales del viaje.
      var detallesGenerales = [["Ciudad Inicio: ".concat(ciudad_inicio), "Ciudad Destino: ".concat(ciudad_destino)], ["Placa: ".concat(placa.placa), "Empresa: ".concat(empresa), "Conductor: ".concat(conductor.nombres, " ").concat(conductor.apellidos), "Valor Flete: ".concat(valor_flete)], ["Fecha Inicio: ".concat(new Date(fecha_inicio).toLocaleDateString()), "Fecha Final: ".concat(new Date(fecha_final).toLocaleDateString())]];

      // Crear una tabla para los detalles generales.
      detallesGenerales.forEach(function (row) {
        row.forEach(function (text, index) {
          var xPos = startX + index * cellWidth;
          doc.rect(xPos, currentY, cellWidth, cellHeight).stroke(); // Dibuja el contorno de la celda.
          doc.fontSize(10).text(text, xPos + 5, currentY + 5, {
            width: cellWidth - 10,
            align: "left"
          });
        });
        currentY += cellHeight;
      });

      // Título centrado para los valores adicionales.
      var datosAdicionalesTitulo = "Valores";
      var datosAdicionalesTituloWidth = doc.widthOfString(datosAdicionalesTitulo);
      var datosAdicionalesTituloXPosition = (doc.page.width - datosAdicionalesTituloWidth) / 2;
      doc.fontSize(12).text(datosAdicionalesTitulo, datosAdicionalesTituloXPosition, currentY + 20).moveDown(1.5);
      currentY += 40;

      // Datos adicionales relacionados con costos y anticipos.
      var datosAdicionales = [["Anticipo Empresa", anticipo_empresa], ["Anticipo Cliente", anticipo_cliente], ["ACPM", acpm], ["Peaje", peaje], ["Mantenimiento", mantenimiento], ["Mecanico", mecanico], ["Otros", otros], ["Total A-F", total_anticipos_fletesPagados], ["Total Gastos", total_gastos], ["Total Saldo", total_saldo]];
      var datosCellWidth = 250; // Ancho de las celdas para los valores adicionales.

      // Crear tabla para los datos adicionales.
      datosAdicionales.forEach(function (row) {
        row.forEach(function (text, index) {
          var xPos = startX + index * datosCellWidth;
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
    console.error("Error generando la plantilla: ".concat(error.message));
    res.status(500).json({
      message: "Error generando el PDF",
      error: error
    });
  }
}