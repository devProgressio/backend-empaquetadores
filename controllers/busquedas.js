const { response } = require("express");

const Usuario = require('../models/usuario');
const Noticia = require('../models/noticia');
const Planilla = require('../models/planilla');
const Falta = require('../models/falta');

const getTodo = async(req, res = response) => {

    // Se puede paginar si es que es necesario.
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, noticias, planillas, faltas] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Noticia.find({ nombre: regex }),
        Planilla.find({ nombre: regex }),
        Falta.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        usuarios,
        noticias,
        planillas,
        faltas
    })

}

// busca en coleccion en especifico.
const getDocumentoColeccion = async(req, res = response) => {

    try {
        // Se puede paginar si es que es necesario.
        const tabla = req.params.tabla;
        const busqueda = req.params.busqueda.trim();
        const regex = new RegExp(busqueda, 'i');

        /* const [usuarios, noticias, planillas] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Noticia.find({ nombre: regex }),
            Planilla.find({ nombre: regex })
        ]); */

        let data = [];

        switch (tabla) {
            case 'noticias':
                data = await Noticia.find({ nombre: regex });
                break;
            case 'planillas':
                data = await Planilla.find({ nombre: regex });
                break;
            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
                break;
            case 'faltas':
                data = await Falta.find({ nombre: regex });
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla no existe.'
                });
        }

        res.json({
            ok: true,
            resultados: data
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al buscar por colección, hable con el administrador.'
        });
    }



}

module.exports = {
    getTodo,
    getDocumentoColeccion
}