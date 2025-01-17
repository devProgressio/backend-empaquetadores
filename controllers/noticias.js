const { response } = require("express")
const Noticia = require("../models/noticia");

const listar = async(req, res = response) => {

    const noticias = await Noticia.find()
        .populate('usuario', 'nombre');

    try {

        res.json({
            ok: true,
            noticias
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al listar noticia, hable con el administrador.'
        });
    }


}

const crear = async(req, res = response) => {
    try {
        const noticia = new Noticia(req.body);
        const noticiaDB = await noticia.save();
        res.json({
            ok: true,
            msg: noticiaDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear noticia, hable con el administrador.'
        })
    }
}

const actualizar = async(req, res = response) => {

    // const noticia = new Noticia(req.body);
    const id = req.params.id;
    const uid = req.uid;
    console.log(id, uid);

    try {

        const noticia = await Noticia.findById(id);
        console.log(id, uid);
        if (!noticia) {
            return res.status(404).json({
                ok: false,
                msg: 'Noticia no encontrada por id'
            });
        }

        const cambiosNoticia = {
            ...req.body,
            usuario: uid
        }

        const noticiaActualizada = await Noticia.findByIdAndUpdate(id, cambiosNoticia, { new: true });

        res.json({
            ok: true,
            noticia: noticiaActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar noticia, hable con el administrador.'
        })
    }

}

const eliminar = async(req, res = response) => {

    const id = req.params.id;

    try {

        const noticia = await Noticia.findById(id);

        if (!noticia) {
            return res.status(404).json({
                ok: false,
                msg: 'Noticia no encontrada por id.'
            });
        }

        await Noticia.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Noticia eliminada.'
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar noticia, hable con el administrador.'
        });
    }

}

module.exports = {
    listar,
    crear,
    actualizar,
    eliminar
}