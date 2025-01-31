import mongoose from 'mongoose';
const licenciaSchema = new mongoose.Schema({
  conductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Persona"
  },
  conductor_cedula: {
    type: Number,
    required: true
  },
  licencia_N: {
    type: Number,
    required: true,
    unique: true
  },
  categoria: {
    type: String,
    enum: ["A1", "A2", "B1", "B2", "B3", "C1", "C2", "C3"],
    required: true
  },
  clase_de_vehiculo: {
    type: String,
    enum: ["Motocicletas hasta de 125 c.c. de cilindrada.", "Motocicletas, motociclos y mototriciclos de más de 125 c.c.  de cilindrada.", "Automóviles, camperos, camionetas y microbuses de servicio particular.", "Camiones, rígidos, busetas y buses para el servicio particular.", "Vehículos articulados de servicio particular", "Automóviles, camperos, camionetas y microbuses de servicio público.", "Camiones, rígidos, busetas y buses para el servicio público.", "Vehículos articulados para el servicio público"],
    required: true
  },
  servicio: {
    type: String,
    enum: ["Publico", "Particular"],
    required: true
  },
  fecha_expedicion: {
    type: Date,
    required: true
  },
  fecha_vencimiento: {
    type: Date,
    required: true
  },
  imagen_url: {
    type: String,
    required: false
  }
}, {
  timestamps: false,
  autoCreate: false
});
const Licencia = mongoose.model("Licencia", licenciaSchema);
export default Licencia;