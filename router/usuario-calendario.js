/*

    UsuarioCalendario
    Ruta: '/api/usuario-calendario'

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    listar,
    crear,
    actualizar,
    eliminar
} = require('../controllers/usuario-calendario');

const router = Router();

router.get('/:usuarioId', validarJWT, listar);

router.post('/', [
        validarJWT,
        check('usuario', 'Falta el identificador del usuario.').isMongoId(),
        check('calendario', 'Falta el identificador de la calendario.').isMongoId(),
        validarCampos
    ],
    crear);

router.put('/:id', [
        validarJWT,
        check('usuario', 'Falta el identificador del usuario.').isMongoId(),
        check('calendario', 'Falta el identificador de la calendario.').isMongoId(),
        validarCampos
    ],
    actualizar);

router.delete('/:id', [
    validarJWT
], eliminar);

module.exports = router;