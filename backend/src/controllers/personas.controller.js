import Persona from '../models/Persona.js';
import Usuario from '../models/Usuario.js';

export const createPersona = async (req, res) => {
    const {
        cedula,
        nombres,
        apellidos,
        fecha_nacimiento,
        correo,
        telefono,
        fecha_inicio_contrato,
        fecha_final_contrato,
        tipo_de_contrato,
    } = req.body;

    try {
        const newPersona = new Persona({
            cedula,
            nombres,
            apellidos,
            fecha_nacimiento,
            correo,
            telefono,
            fecha_inicio_contrato,
            fecha_final_contrato: fecha_final_contrato || null,
            tipo_de_contrato,
        });

        const savedPersona = await newPersona.save();

        return res.status(201).json({
            message: 'Una nueva persona ha sido registrada exitosamente...!',
            savedPersona,
        });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json(error);
        }
    }
};

export const getAllPersonas = async (req, res) => {
    try {
        // // ------------------------------------------------------------------------------------------------------------- //
        // // **** Esta sección deberá ser removida para la producción... **** //
        // const login = await FindLoginStatus(1);

        // if (login === false)
        //   return res.status(401).json({
        //     message:
        //       'Acceso NO permitido: Debe loggearse primero...!!!',
        //   });
        // // ------------------------------------------------------------------------------------------------------------- //

        const personas = await Persona.find();

        if (!personas)
            return res.status(404).json({
                message: 'No se ha encontrado ninguna persona...',
            });

        return res.status(200).json(personas);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json(error);
        }
    }
};

export const getPersonaByDNI = async (req, res) => {
    try {
        const { cedula } = req.params;

        const persona = await Persona.findOne({
            cedula: cedula,
        });

        if (!persona)
            return res
                .status(404)
                .json({ message: 'Persona no encontrada...!' });

        return res.status(200).json(persona);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json(error);
        }
    }
};

export const getPersonaByID = async (req, res) => {
    try {
        const { _id } = req.params;

        const persona = await Persona.findById(_id);

        if (!persona)
            return res
                .status(404)
                .json({ message: 'Persona no encontrada...!' });

        return res.status(200).json(persona);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json(error);
        }
    }
};

export const updatePersona = async (req, res) => {
    try {
        const { _id } = req.params;
        const { cedula } = req.body;
        const updateData = req.body;
        let filter = {};

        if (_id && /^[0-9a-fA-F]{24}$/.test(_id)) {
            filter = { _id };
        } else if (cedula) {
            filter = { cedula: Number(cedula) };
        } else {
            return res.status(400).json({
                message: 'Debe proporcionar _id válido o nro. de cédula...!',
            });
        }

        const findPersona = await Persona.findOne(filter);

        if (!findPersona)
            return res
                .status(404)
                .json({ message: 'Empleado no encontrado...!' });

        // Se actualiza la 'Persona' en la BD con los campos
        // que fueron enviados en el cuerpo de la solicitud...
        const updatePersona = await Persona.findOneAndUpdate(
            filter,
            { $set: updateData },
            { new: true }, // Para devolver el registro actualizado...
        );

        return res.status(200).json({
            message: `El empleado: ${updatePersona.nombres} ${updatePersona.apellidos} ha sido actualizado satisfactoriamente...!!!`,
            updatePersona,
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json(error);
        }
    }
};

export const deletePersona = async (req, res) => {
    try {
        const { cedula } = req.body;

        if (!cedula) {
            return res.status(400).json({
                message: 'Debe proporcionar el número de cédula...!',
            });
        }

        const findPersona = await Persona.findOne({ cedula: Number(cedula) });
        console.log(findPersona);

        if (!findPersona) {
            return res
                .status(404)
                .json({ message: 'Empleado no encontrado...!' });
        }

        // Se eliminan registros asociados si existen...
        const findUsuarioPersona = await Usuario.findOne({
            persona: findPersona._id,
        });
        console.log(findUsuarioPersona);

        if (findUsuarioPersona) {
            await Usuario.findByIdAndDelete(findUsuarioPersona._id);
        }

        await Persona.findByIdAndDelete(findPersona._id);

        return res.status(200).json({
            message: 'El empleado ha sido eliminado correctamente...!',
        });
    } catch (error) {
        console.error(error.message);
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json(error);
        }
    }
};
