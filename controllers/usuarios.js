const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const mailer = require('../templates/registro-template');
const { randomPassword } = require('../middlewares/random-password');

const listar = async(req, res = response) => {
    try {
        const usuarios = await Usuario.find();
        res.json({
            ok: true,
            usuarios
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un problema al listar usuarios. Hable con el administrador.'
        })
    }
}


/* const getUsuarios = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    // SKIP se salta todos los registros desde la variable desde.
    const [usuarios, total] = await Promise.all([
        Usuario
        .find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    })

} */

const crear = async(req, res = response) => {
    try {
        const { email, password } = req.body;
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo '" + email + "' ya está registrado"
            });
        }

        const usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();

        // password por defecto.
        const randomPass = randomPassword(5,3,2);
        usuario.password = bcrypt.hashSync(randomPass, salt);

        const usuarioDB = await usuario.save();
        // Generar un TOKEN
        //const token = await generarJWT(usuario.id);

        // ENVIAR CORREO CON LA CONTRASEÑA
        mailer.enviarMail(usuarioDB, randomPass);

        res.json({
            ok: true,
            usuarioDB,
            //token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al crear usuario.'
        })
    }
}

const actualizar = async(req, res = response) => {

    //TODO: Validar token y comprobar si es el usuario correcto
    try {
        const { uid } = req.body;
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        //Quita o extrae el password, google, email si es que viniera ya que no se actualizaran.
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            
            if (existeEmail && existeEmail.uid == uid) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        console.log(campos);
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar usuario'
        })
    }
};

const actualizarPerfil = async(req, res = response) => {
    try {
        const id = req.params.id;
        const usuarioDB = await Usuario.findById(id);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        const { email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            
            if (existeEmail && existeEmail.uid == id) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar usuario'
        })
    }
};

const eliminar = async(req, res = response) => {
    try {
        const uid = req.params.id;
        console.log('eliminarUsuario', uid);
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        return res.json({
            ok: true,
            msg: 'Se eliminó usuario con id' + uid
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al eliminar usuario'
        });
    }
}

const actualizarPassword = async(req, res = response) => {
    try {
        console.log('llego');
        const uid = req.params.id;
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const { password } = req.body;
        const salt = bcrypt.genSaltSync();
        const update = {
            password: bcrypt.hashSync(password, salt),
            cambiaPassword: true
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, update, { new: true });
        console.log(usuarioActualizado);
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar usuario'
        })
    }
};

module.exports = {
    listar,
    crear,
    actualizar,
    actualizarPerfil,
    eliminar,
    actualizarPassword
}