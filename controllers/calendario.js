const { response } = require("express");
const Calendario = require('../models/calendario');

const listarPorPlanilla = async(req, res = response) => {
    const planillaId = req.params.planillaId;
    const calendario = await Calendario.find({ planillaId: planillaId });
    try {
        res.json({
            ok: true,
            calendario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al listar planillas turnos. Hable con el administrador.'
        });
    }

}

const crear = async(req, res = response) => {
    const calendario = new Calendario(req.body);
    try {
        const calendarioDB = await calendario.save();
        res.json({
            ok: true,
            turnoCreado: calendarioDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }

}

const actualizar = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarPlanillaTurno'
    })

}

const eliminar= async(req, res = response) => {
    const id = req.params.id;
    try {
        const calendario = await Calendario.findById(id);
        if (!calendario) {
            return res.status(404).json({
                ok: true,
                msg: 'No se encontró el turno.'
            });
        }
        await Calendario.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Turno fue eliminado exitosamente.'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar turno, hable con el administrador.'
        });
    }

}

module.exports = {
    listarPorPlanilla,
    crear,
    actualizar,
    eliminar
}