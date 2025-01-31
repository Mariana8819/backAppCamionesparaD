import mongoose from 'mongoose';
const documentoSchema = new mongoose.Schema({
  cerificado_N: {
    type: String,
    required: true,
    unique: true
  },
  tipo: {
    type: String,
    enum: ["Poliza de seguro", "Soat", "tecnomecanica"],
    required: true
  },
  vehiculo_placa: {
    type: String,
    required: true,
    unique: true
  },
  fecha_expedicion: Date,
  fecha_vencimiento: Date,
  vehiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehiculo"
  },
  imagen_url: {
    type: String,
    required: true
  }
}, {
  timestamps: false,
  autoCreate: false
});
const Documento = mongoose.model("Documento", documentoSchema);
export default Documento;