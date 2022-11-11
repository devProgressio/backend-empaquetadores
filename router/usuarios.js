/* 
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_mismoUsuario } = require('../middlewares/validar-jwt');
const { listar, crear, actualizar, actualizarPerfil, eliminar, actualizarPassword } = require('../controllers/usuarios');

const router = Router();

router.get('/', validarJWT, listar);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crear);

router.put('/:id', [
        validarJWT,
        validarADMIN_ROLE_o_mismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizar);

    router.put('/perfil/:id', [
        validarJWT,
        validarADMIN_ROLE_o_mismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPerfil);

router.delete('/:id', [validarJWT, validarADMIN_ROLE_o_mismoUsuario], eliminar);

router.put('/password/:id', [
    validarJWT,
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
    ],
    actualizarPassword);

module.exports = router;