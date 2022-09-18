const { response } = require("express");
const Calendario = require('../models/calendario');
const Planilla = require('../models/planilla');

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

module.exports = {
    listar
}