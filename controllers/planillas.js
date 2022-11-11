const { response } = require("express");
const Planilla = require('../models/planilla');

const listar = async (req, res = response) => {
    try {
        const planillas = await Planilla.find();
        res.json({
            ok: true,
            planillas
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un problema al listar planillas. Hable con el administrador.'
        })
    }
}

const crear = async (req, res = response) => {
    try {
        const planilla = new Planilla(req.body);
        const planillaDB = await planilla.save();
        res.json({
            ok: true,
            msg: planillaDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }
}

const actualizar = async (req, res = response) => {
    try {
        const id = req.params.id;
        const planilla = await Planilla.findById(id);
        if (!planilla) {
            return res.status(404).json({
                ok: false,
                msg: 'Planilla no encontrada por id'
            });
        }

        // verificar que haya solo una planilla activa.
        // si es que va a activar una
        const existeActiva = await Planilla.find({estado: true});

        if (existeActiva.length > 0 && req.body.estado) {
            return res.status(404).json({
                ok: false,
                msg: 'Ya existe una planilla activa'
            });
        }

        const cambiosPlanilla = {
            ...req.body
        }

        const planillaActualizada = await Planilla.findByIdAndUpdate(id, cambiosPlanilla, { new: true });


        res.json({
            ok: true,
            planilla: planillaActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar planilla, hable con el administrador.'
        })
    }
}

const eliminar = async (req, res = response) => {

    const id = req.params.id;

    try {

        const planilla = await Planilla.findById(id);

        if (!planilla) {
            return res.status(404).json({
                ok: false,
                msg: 'Planilla no encontrada por id.'
            });
        }

        await Planilla.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Planilla fue eliminada.'
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar planilla, hable con el administrador.'
        });
    }

}

module.exports = {
    listar,
    crear,
    actualizar,
    eliminar
}