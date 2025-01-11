import Persona from '../models/Persona.js';
import Tanqueo from '../models/Tanqueo.js';
import Volqueta from '../models/Volqueta.js';
import CargaPesada from '../models/CargaPesada.js';

export const getRefuelingImageByDNIAndInvoice = async (req, res) => {
    try {
        const { cedula, recibo } = req.params;

        // Se busca al empleado por cedula...
        const employee = await Persona.findOne({ cedula });

        if (!employee) {
            return res
                .status(404)
                .json({ message: 'Empleado NO encontrado...!' });
        }

        // Se busca el tanqueo correspondiente al recibo del empleado...
        const refueling = await Tanqueo.findOne({
            conductor: employee._id,
            n_recibo: recibo,
        });

        /////// SE DEBEN MODIFICAR ESTAS FUNCIONES, YA QUE LAS IMAGENES /////
        /////// SE ENCUENTRAN DIRECTAMENTE EN EL MODELO "Tanqueo" /////
        // Se busca la imagen correspondiente al ID de tanqueo...
        // const image = await RefuelingImage.findOne({
        //     refueling: refueling._id,
        // });

        // if (!image)
        //     return res
        //         .status(404)
        //         .json({ message: 'Imagen no encontrada...!' });

        // // Se configuran los encabezados de respuesta y se envia la imagen en binario...
        // res.set('Content-Type', image.mimeType); // MimeType, por ejemplo, 'image/png'...
        // res.send(image.image_data); // Enviar la imagen en formato binario...
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json(error);
        }
    }
};

export const getVolquetaImageByDNIAndInvoice = async (req, res) => {
    try {
        const { cedula, recibo } = req.params;

        // Se busca al empleado por cedula...
        const employee = await Persona.findOne({ cedula });

        if (!employee) {
            return res
                .status(404)
                .json({ message: 'Empleado NO encontrado...!' });
        }

        // Se busca el tanqueo correspondiente al recibo del empleado...
        const volq = await Volqueta.findOne({
            conductor: employee._id,
            n_planilla: recibo,
        });

        /////// SE DEBEN MODIFICAR ESTAS FUNCIONES, YA QUE LAS IMAGENES /////
        /////// SE ENCUENTRAN DIRECTAMENTE EN EL MODELO "Volqueta" /////
        // // Se busca la imagen correspondiente al ID de tanqueo...
        // const image = await VolquetaImage.findOne({ volqueta: volq._id });

        // if (!image)
        //     return res
        //         .status(404)
        //         .json({ message: 'Imagen no encontrada...!' });

        // // Se configuran los encabezados de respuesta y se envia la imagen en binario...
        // res.set('Content-Type', image.mimeType); // MimeType, por ejemplo, 'image/png'...
        // res.send(image.image_data); // Enviar la imagen en formato binario...
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json(error);
        }
    }
};

export const geteHeavyLoadImageByDNIAndInvoice = async (req, res) => {
    try {
        const { cedula, recibo } = req.params;

        // Se busca al empleado por cedula...
        const employee = await Persona.findOne({ cedula });

        if (!employee) {
            return res
                .status(404)
                .json({ message: 'Empleado NO encontrado...!' });
        }

        const heavyLoad = await CargaPesada.findOne({
            conductor: employee._id,
            n_planilla: recibo,
        });

        /////// SE DEBEN MODIFICAR ESTAS FUNCIONES, YA QUE LAS IMAGENES /////
        /////// SE ENCUENTRAN DIRECTAMENTE EN EL MODELO "CargaPesada" /////
        // // Se busca la imagen correspondiente al ID de tanqueo...
        // const image = await HeavyLoadImage.findOne({
        //     heavyload: heavyLoad._id,
        // });

        // if (!image)
        //     return res
        //         .status(404)
        //         .json({ message: 'Imagen no encontrada...!' });

        // // Se configuran los encabezados de respuesta y se envia la imagen en binario...
        // res.set('Content-Type', image.mimeType); // MimeType, por ejemplo, 'image/png'...
        // res.send(image.image_data); // Enviar la imagen en formato binario...
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json(error);
        }
    }
};
