const { response } = require("express");
const TipoFalta = require('../models/tipo-falta');

const getTiposFaltas = async(req, res = response) => {

    const tiposFaltas = await TipoFalta.find();

    try {

        res.json({
            ok: true,
            tiposFaltas
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un problema al listar tipos de faltas. Hable con el administrador.'
        })
    }

}

const crearTipoFalta = async(req, res = response) => {

    const tipoFalta = new TipoFalta(req.body);

    try {

        const tipoFaltaDB = await tipoFalta.save();

        res.json({
            ok: true,
            msg: tipoFaltaDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al crear tipo de falta. Hable con el administrador.'
        })
    }

}

const actualizarTipoFalta = async(req, res = response) => {

    const id = req.params.id;
    console.log(id);

    try {

        const tipoFalta = await TipoFalta.findById(id);
        console.log(id);
        if (!tipoFalta) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo falta no encontrada por id'
            });
        }

        const cambiosTipoFalta = {
            ...req.body
        }

        const tipoFaltaActualizada = await TipoFalta.findByIdAndUpdate(id, cambiosTipoFalta, { new: true })

        res.json({
            ok: true,
            tipoFalta: tipoFaltaActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar tipo de falta, hable con el administrador.'
        })
    }

}

const eliminarTipoFalta = async(req, res = response) => {

    const id = req.params.id;

    try {

        const tipoFalta = await TipoFalta.findById(id);

        if (!tipoFalta) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo falta no encontrada por id.'
            });
        }

        await TipoFalta.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Tipo Falta fue eliminada.'
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar tipo falta, hable con el administrador.'
        });
    }

}

module.exports = {
    getTiposFaltas,
    crearTipoFalta,
    actualizarTipoFalta,
    eliminarTipoFalta
}