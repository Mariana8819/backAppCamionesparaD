"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generarNumeroPlanilla = void 0;
//Funcion para generar los nPlanilla de las planillas de carga pesada y volquetas
var generarNumeroPlanilla = exports.generarNumeroPlanilla = function generarNumeroPlanilla() {
  var fecha = new Date(); //Se obtiene fecha y hora
  var año = fecha.getFullYear(); // Devuelve el año completo.
  var mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Obtiene el mes (de 0 a 11), por lo que se suma 1 para obtener un rango de 1 a 12.
  var dia = String(fecha.getDate()).padStart(2, "0"); //  Devuelve el día del mes.
  var numeroAleatorio = Math.floor(100000 + Math.random() * 900000);

  //Combina las partes con un prefijo (YM), la fecha, y un número aleatorio separado por un guion.
  return "YM".concat(año).concat(mes).concat(dia, "-").concat(numeroAleatorio);
};