const { response } = require("express");
const Calendario = require('../models/calendario');
const Planilla = require('../models/planilla');
const TomaTurno = require('../models/toma-turno');

const listar = async(req, res = response) => {
    // buscar la planilla activa.
    // luego con ese ID buscar los calendarios
    const planilla = await Planilla.find({ estado: true }).limit(1);
    console.log("planilla", planilla);
    console.log("ID", planilla[0]._id);
    const calendario = await Calendario.find({ planillaId: planilla[0]._id });
    console.log("calendario", calendario);
    try {
        res.json({
            ok: true,
            planilla: planilla[0],
            calendario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al listar planillas turnos. Hable con el administrador.'
        });
    }
}


// crea data en la tabla toma-turno.
const activar = async(req, res = response) => {
    const planilla = await Planilla.find({ estado: true }).limit(1);
    const calendarios = await Calendario.find({ planillaId: planilla[0]._id });

    // GRABAR EN LA TABLA TOMA-TURNO.

    const tomaTurno = new TomaTurno({
        fechaInicio: new Date(),
        fechaTermino: new Date(),
        calendario: calendario,
        planilla: planilla
    });

    // RESPONDE DATA DESDE TABLA TOMA-TURNO para poder eliminar a gusto.
    try {
        res.json({
            ok: true,
            planilla: planilla[0],
            calendario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al listar planillas turnos. Hable con el administrador.'
        });
    }
}

module.exports = {
    listar
}