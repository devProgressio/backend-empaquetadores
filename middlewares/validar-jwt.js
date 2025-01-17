const jwt = require('jsonwebtoken');
const { ROLES } = require('../emun/roles');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {
    //Leer el Token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}

const validarADMIN_ROLE = async(req, res, next) => {

    console.log('ValidaraDMIN_ROLE', req.uid);
    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            console.log('1');
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== ROLES.ADMINISTRADOR) {
            console.log('2');
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

    } catch (error) {
        console.log('3');
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const validarADMIN_ROLE_o_mismoUsuario = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role === ROLES.ADMINISTRADOR || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_mismoUsuario
}