import mongoose from 'mongoose';
const cargaPesadaSchema = new mongoose.Schema({
  n_planilla: {
    type: String,
    required: true,
    unique: true
  },
  fecha_inicio: {
    type: Date,
    default: Date.now,
    required: true
  },
  fecha_final: {
    type: Date,
    required: true
  },
  placa_vehiculo: {
    type: String,
    required: true
  },
  placa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehiculo'
  },
  conductor_cedula: {
    type: Number,
    required: true
  },
  conductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona'
  },
  ciudad_inicio: {
    type: String,
    required: true
  },
  ciudad_destino: {
    type: String,
    required: true
  },
  empresa: {
    type: String,
    required: true
  },
  valor_flete: {
    type: Number,
    default: 0,
    required: true
  },
  anticipo_empresa: {
    type: Number,
    default: 0
  },
  anticipo_cliente: {
    type: Number,
    default: 0
  },
  acpm: {
    type: Number,
    default: 0
  },
  peaje: {
    type: Number,
    default: 0
  },
  mantenimiento: {
    type: Number,
    default: 0
  },
  parqueadero: {
    type: Number,
    default: 0
  },
  cargue: {
    type: Number,
    default: 0
  },
  descargue: {
    type: Number,
    default: 0
  },
  comisiones_propinas: {
    type: Number,
    default: 0
  },
  //mecanico: { type: Number, default: 0 },

  // otros: { type: Number, default: 0 },
  otros: [{
    monto: {
      type: Number,
      default: 0
    },
    descripcion: {
      type: String,
      default: ""
    }
  }],
  total_anticipos_fletesPagados: {
    type: Number,
    default: 0
  },
  total_gastos: {
    type: Number,
    default: 0
  },
  total_saldo: {
    type: Number,
    default: 0
  },
  observaciones: {
    type: String
  }
}, {
  timestamps: false,
  autoCreate: false
});
const CargaPesada = mongoose.model('CargaPesada', cargaPesadaSchema);
export default CargaPesada;