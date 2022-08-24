const { response } = require("express");
const UsuarioFalta = require('../models/usuario-falta');

const listar = async(req, res = response) => {
    const id = req.params.usuarioId;
    const usuarioFalta = await UsuarioFalta.find({ usuario: id })
        .populate('usuario', 'nombre')
        .populate('falta', 'nombre gravedad')
        .populate('supervisor', 'nombre');
    try {
        res.json({
            ok: true,
            usuarioFalta
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al listar turnos por usuario. Hable con el administrador.'
        });
    }
}

const crear = async(req, res = response) => {

    try {

        console.log(req.body);
        const falta = new Falta(req.body);
        const existe = await Falta.findOne({ nombre: falta.nombre });

        if (!existe) {
            const faltaDB = await falta.save();
            res.json({
                ok: true,
                msg: faltaDB
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe una falta con el nombre ${existe.nombre}`
            });
        }


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al crear falta. Hable con el administrador.'
        });
    }

}

const actualizar = async(req, res = response) => {

    try {
        const id = req.params.id;
        console.log(`Actualizar Falta ID: ${id}`);
        const falta = await Falta.findById(id);

        if (!falta) {
            return res.status(404).json({
                ok: true,
                msg: 'Falta no encontrada por ID.'
            });
        }

        const cambiosFalta = {
            ...req.body
        }

        const faltaActualizada = await Falta.findByIdAndUpdate(id, cambiosFalta, { new: true })

        res.json({
            ok: true,
            planilla: faltaActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar falta, hable con el administrador.'
        })
    }

}

const eliminar = async(req, res = response) => {

    const id = req.params.id;

    try {

        const falta = await Falta.findById(id);

        if (!falta) {
            return res.status(404).json({
                ok: true,
                msg: 'Falta no encontrada por id.'
            });
        }

        await Falta.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Falta fue eliminada.'
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar falta, hable con el administrador.'
        });
    }

}

module.exports = {
    listar,
    crear,
    actualizar,
    eliminar
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 