const { response } = require("express");
const UsuarioCalendario = require('../models/usuario-calendario');
const Calendario = require('../models/calendario');

const listar = async(req, res = response) => {
    const id = req.params.usuarioId;
    const usuarioCalendario = await UsuarioCalendario.find({ usuario: id })
        .populate('usuario', 'nombre')
        .populate('calendario', 'fechaHoraInicio fechaHoraTermino');
    try {
        res.json({
            ok: true,
            usuarioCalendario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al listar turnos por usuario. Hable con el administrador.'
        });
    }
}

const crear = async(req, res = response) => {
    const usuarioCalendario = new UsuarioCalendario(req.body);
    try {
        const usuarioCalendarioDB = await usuarioCalendario.save();

        // Validar que no este tomando el mismo turno dos veces.




        // Resta a la cantidad 1.
        const calendario = await Calendario.findById(usuarioCalendarioDB.calendario);
        console.log(calendario);
        const update = {
            cantidad: (calendario.cantidad - 1)
        }
        const usuarioCalendarioActualizado = await Calendario.findByIdAndUpdate(calendario.id, update, { new: true });
        console.log(usuarioCalendarioActualizado);
        res.json({
            ok: true,
            usuarioCalendario: usuarioCalendarioActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }

}

const actualizar = (req, res = response) => {
    // TODO: pendiente
    res.json({
        ok: true,
        msg: 'actualizarPlanillaTurno'
    })

}

const eliminar= async(req, res = response) => {
    const id = req.params.id;
    try {
        const usuarioCalendario = await UsuarioCalendario.findById(id);
        if (!usuarioCalendario) {
            return res.status(404).json({
                ok: true,
                msg: 'No se encontró el turno.'
            });
        }

        await UsuarioCalendario.findByIdAndDelete(id);
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
    listar,
    crear,
    actualizar,
    eliminar
}