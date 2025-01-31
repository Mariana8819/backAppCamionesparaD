import CargaPesada from '../models/CargaPesada.js';
import Persona from '../models/Persona.js';
import Vehiculo from '../models/Vehiculo.js';
export const createHeavyLoadForm = async (req, res) => {
  try {
    const {
      n_planilla,
      fecha_inicio,
      fecha_final,
      placa_vehiculo,
      conductor_cedula,
      ciudad_inicio,
      ciudad_destino,
      empresa,
      valor_flete,
      anticipo_empresa,
      anticipo_cliente,
      acpm,
      peaje,
      mantenimiento,
      parqueadero,
      cargue,
      descargue,
      comisiones_propinas,
      // mecanico,
      otros = [],
      observaciones
    } = req.body;

    // Se verifica si existe el conductor...
    const driver = await Persona.findOne({
      cedula: conductor_cedula
    });
    //
    if (!driver) {
      return res.status(404).json({
        message: `El conductor con la cédula ${conductor_cedula} NO se encuentra registrado...!`
      });
    }

    // Se verifica si existe el vehículo...
    const vehicle = await Vehiculo.findOne({
      placa: placa_vehiculo
    });
    //
    if (!vehicle) {
      return res.status(404).json({
        message: `El vehículo con placa ${placa_vehiculo} NO se encuentra registrado...!`
      });
    }

    // // // const generateCN = generarNumeroPlanilla(); /////////////////

    //Función para convertir a número y manejar NaN
    const toNumber = value => {
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num; //retorna 0 si no es un número
    };

    // Sumatoria de todos los anticipos recibidos...
    let totalAdvance = toNumber(anticipo_empresa) + toNumber(anticipo_cliente);

    // Sumatoria de todos los gastos...
    let totalSpends = toNumber(acpm) + toNumber(peaje) + toNumber(mantenimiento) + toNumber(parqueadero) + toNumber(cargue) + toNumber(descargue) + toNumber(comisiones_propinas);
    //parseInt(mecanico) +
    //parseInt(otros);

    // Sumar gastos en 'otros'
    otros.forEach(item => {
      const monto = toNumber(item.monto);
      console.log(`Monto en otros: ${monto}`);
      totalSpends += monto;
    });
    console.log(`Total de gastos antes del saldo:${totalSpends}`);

    // Saldo total...
    let totalBalance = toNumber(valor_flete) - totalAdvance - totalSpends;
    const newHeavyLoad = new CargaPesada({
      // n_planilla: generateCN, /////////////////
      n_planilla,
      fecha_inicio,
      fecha_final,
      placa_vehiculo,
      placa: vehicle._id,
      conductor_cedula,
      conductor: driver._id,
      ciudad_inicio,
      ciudad_destino,
      empresa,
      valor_flete: toNumber(valor_flete),
      anticipo_empresa: toNumber(anticipo_empresa),
      anticipo_cliente: toNumber(anticipo_cliente),
      acpm: toNumber(acpm),
      peaje: toNumber(peaje),
      mantenimiento: toNumber(mantenimiento),
      parqueadero: toNumber(parqueadero),
      cargue: toNumber(cargue),
      descargue: toNumber(descargue),
      comisiones_propinas: toNumber(comisiones_propinas),
      //mecanico,
      otros,
      total_anticipos_fletesPagados: totalAdvance,
      total_gastos: totalSpends,
      total_saldo: totalBalance
    });
    const savedHeavyLoad = await newHeavyLoad.save();

    // await heavyLoadTemplate(savedHeavyLoad);

    await Persona.findByIdAndUpdate(driver._id, {
      $push: {
        carga_pesada: savedHeavyLoad._id
      }
    }, {
      new: true
    });
    await Vehiculo.findByIdAndUpdate(vehicle._id, {
      $push: {
        cargaPesada: savedHeavyLoad._id
      }
    }, {
      new: true
    });
    return res.status(201).json({
      message: `La planilla de "Carga Pesada" Nº ${savedHeavyLoad.n_planilla} ha sido registrada exitosamente...!!!`,
      savedHeavyLoad
    });
  } catch (error) {
    console.error(error.stack); // Esto te mostrará detalles más específicos sobre dónde ocurre el error
    if (error instanceof Error) {
      return res.status(500).json({
        error: error.message
      });
    } else {
      return res.status(500).json(error);
    }
  }
};
export const getAllHeavyLoadForms = async (req, res) => {
  try {
    const showAllHeavyLoadForms = await CargaPesada.find();
    if (!showAllHeavyLoadForms) return res.status(404).json({
      message: 'No se ha encontrado ninguna planilla de "Carga Pesada"...!'
    });
    return res.status(200).json(showAllHeavyLoadForms);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: error.message
      });
    } else {
      return res.status(500).json(error);
    }
  }
};
export const getHeavyLoadByFormNumber = async (req, res) => {
  try {
    const {
      n_planilla
    } = req.params;
    const findHeavyLoadForm = await CargaPesada.findOne({
      n_planilla: n_planilla
    });
    if (!findHeavyLoadForm) {
      return res.status(404).json({
        message: 'No se encontró ninguna planilla de Carga Pesada...!'
      });
    }
    return res.status(200).json(findHeavyLoadForm);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: error.message
      });
    } else {
      return res.status(500).json(error);
    }
  }
};
export const getHeavyLoadByFormID = async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    console.log(_id);
    const findHeavyLoadFormID = await CargaPesada.findById(_id);
    console.log(findHeavyLoadFormID);
    if (!findHeavyLoadFormID) {
      return res.status(404).json({
        message: 'No se encontró ninguna planilla de Carga Pesada...!'
      });
    }
    return res.status(200).json(findHeavyLoadFormID);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: error.message
      });
    } else {
      return res.status(500).json(error);
    }
  }
};