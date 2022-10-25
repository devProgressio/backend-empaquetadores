const { response } = require("express");
const UsuarioCalendario = require('../models/usuario-calendario');
const Calendario = require('../models/calendario');

const listar = async(req, res = response) => {
    const id = req.params.usuarioId;
    //, calendario:  {$gt: new Date()}

    const fechaHoraServidor = new Date();
    const usuarioCalendario = await UsuarioCalendario.find({ usuario: id })
    .populate('usuario', 'nombre')
        .populate({
            path: 'calendario',
            populate: {
                path: 'calendario',
                select: 'fechaHoraInicio fechaHoraTermino'
              },
            options: { sort: { 'fechaHoraInicio': -1 } }
          });
    

    // los que aún no pasan de la fecha hora del servidor.
    // tomar todos los turnos mayores que la fecha del servidor.
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
    console.log('usuario: ', usuarioCalendario.usuario);
    console.log('calendario: ', usuarioCalendario.calendario);
    try {
        const calendario = await Calendario.findById(usuarioCalendario.calendario);
        if (calendario.cantidad <= 0 ) {
            res.status(400).json({
                ok: false,
                msg: 'Ya no existe el turno seleccionado.'
            });
            return;
        }

        //const usuarioCalendarioExist = await UsuarioCalendario.find({ usuario: usuarioCalendario.usuario, calendario: usuarioCalendario.calendario });
        const exists = await UsuarioCalendario.exists({ usuario: usuarioCalendario.usuario, calendario: usuarioCalendario.calendario });
        console.log('EXISTE', exists);
        if (exists) {
            res.status(400).json({
                ok: false,
                msg: 'Ya tiene el turno seleccionado.'
            });
            return;
        }

        // Primero validar que aún exista, si existe se valida que no tenga el mismo turno ya asignado.

        // Validar que no este tomando el mismo turno dos veces.

        const usuarioCalendarioDB = await usuarioCalendario.save();
        // Resta a la cantidad 1.
        // const calendario = await Calendario.findById(usuarioCalendarioDB.calendario);
        console.log(calendario);
        const update = {
            cantidad: (calendario.cantidad - 1)
        }
        const calendarioActualizado = await Calendario.findByIdAndUpdate(calendario.id, update, { new: true });
        console.log(calendarioActualizado);
        res.json({
            ok: true,
            usuarioCalendario: usuarioCalendarioDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
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