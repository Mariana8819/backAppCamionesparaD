import mongoose from 'mongoose';

const vehiculoSchema = new mongoose.Schema(
    {
        placa: {
            type: String,
            required: true,
            unique: true,
        },
        // tipo_de_combustible: {
        //   type: String,
        //   enum: ["Gasolina", "A.C.P.M"],
        //   required: false,
        // },
        clase_de_vehiculo: {
            type: String,
            enum: [
                'VOLQUETA DTRQ',
                'VOLQUETA',
                'CARRO TANQUE',
                'CAMION SENCILLO',
                'TRACTOCAMION',
                'CAMIONETA JEFES',
            ],
            required: true,
        },
        marca: {
            type: String,
            required: true,
        },
        // modelo: {
        //   type: Number,
        //   required: true,
        // },
        persona_cedula: {
            // Para referenciar directamente al modelo 'Persona'...
            type: Number,
            default: 0,
        },
        color: {
            type: String,
            required: true,
        },
        propietario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Persona',
        },
        documentos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Documento',
            },
        ],
        volquetas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Volqueta',
            },
        ],
        cargaPesada: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tractomula',
            },
        ],
        tanqueos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tanqueo',
            },
        ],
    },
    {
        timestamps: false,
        autoCreate: false,
    },
);

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

export default Vehiculo;
