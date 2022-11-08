const { response } = require("express");
const Calendario = require('../models/calendario');
const Planilla = require('../models/planilla');
const TomaTurno = require('../models/toma-turno');

const listarTodo = async(req, res = response) => {
    try {
        const tomaTurno = await TomaTurno.find()
        .populate('planilla', 'nombre')
        .populate('usuarioInicio', 'nombre')
        .populate('usuarioTermino', 'nombre');
        res.json({
            ok: true,
            tomaTurno
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un problema al listar faltas. Hable con el administrador.'
        })
    }

}

const obtenerPlanillaActiva = async (req, res = response) => {
    try {
        const planilla = await Planilla.find({ estado: true }).sort({ fechaHoraInicio : -1 }).limit(1);
        res.json({
            ok: true,
            planilla: planilla[0],
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener planilla activa. Hable con el administrador.'
        });
    }
}
const obtenerTomaTurnoActiva = async (req, res = response) => {
    try {
        const tomaTurno = await TomaTurno.find({ estado: true }).sort({ fechaHoraInicio : -1 }).limit(1);
        res.json({
            ok: true,
            tomaTurno: tomaTurno[0],
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener toma de turno activa. Hable con el administrador.'
        });
    }
}

const listar = async (req, res = response) => {
    // buscar la planilla activa.
    // luego con ese ID buscar los calendarios
    //const planilla = await Planilla.find({ estado: true }).sort({ fechaHoraInicio : -1 }).limit(1);
    //const calendario = await Calendario.find({ planillaId: planilla[0]._id });

    try {
        const tomaTurno = await TomaTurno.find({ estado: true }).sort({ fechaHoraInicio : -1 }).limit(1);
        if (tomaTurno.length <= 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Toma de turno Desactivada.'
            });
        }
        const planilla = await Planilla.findById(tomaTurno[0].planilla);
        const calendario = await Calendario.find({ planillaId: planilla.id });
        res.json({
            ok: true,
            planilla,
            calendario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al listar planillas para la toma de turnos. Hable con el administrador.'
        });
    }
}

// crea data en la tabla toma-turno.
const activar = async (req, res = response) => {
    try {
        const id = req.uid;
        // no es necesario enviar la planilla.
        // const { planilla: planillaId } = req.body;
        const planillaActiva = await Planilla.find({ estado: true }).sort({ fechaHoraInicio : -1 }).limit(1);
        const tomaTurno = new TomaTurno({
            planilla: planillaActiva[0].id,
            usuarioInicio: id
        });
        const tomaTurnoDB = await tomaTurno.save();
        res.json({
            ok: true,
            tomaTurno: tomaTurnoDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al activar la toma de turno. Hable con el administrador.'
        });
    }
}

const desactivar = async (req, res = response) => {
    try {
        const uid = req.uid;
        const planillaId = req.params.id;
        const tomaTurnoFind = await TomaTurno.find({planilla: planillaId, estado: true});
        if (!tomaTurnoFind) {
            return res.status(404).json({
                ok: false,
                msg: 'Toma de turnos no existe.'
            });
        }
        //----------------------------------------- 
        const cambiosTomaTurno = {
            estado: false,
            fechaHoraTermino: Date.now(),
            usuarioTermino: uid
        }

        const tomaTurnoActualizada = await TomaTurno.findByIdAndUpdate(tomaTurnoFind[0].id, cambiosTomaTurno, { new: true })
        res.json({
            ok: true,
            tomaTurno: tomaTurnoActualizada
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al activar la toma de turno. Hable con el administrador.'
        });
    }
}

module.exports = {
    listarTodo,
    listar,
    activar,
    desactivar,
    obtenerPlanillaActiva,
    obtenerTomaTurnoActiva
}