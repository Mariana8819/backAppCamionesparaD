//Funcion para generar los nPlanilla de las planillas de carga pesada y volquetas
export const generarNumeroPlanilla = () => {
  const fecha = new Date(); //Se obtiene fecha y hora
  const año = fecha.getFullYear(); // Devuelve el año completo.
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Obtiene el mes (de 0 a 11), por lo que se suma 1 para obtener un rango de 1 a 12.
  const dia = String(fecha.getDate()).padStart(2, "0"); //  Devuelve el día del mes.
  const numeroAleatorio = Math.floor(100000 + Math.random() * 900000);

  //Combina las partes con un prefijo (YM), la fecha, y un número aleatorio separado por un guion.
  return `YM${año}${mes}${dia}-${numeroAleatorio}`;
};