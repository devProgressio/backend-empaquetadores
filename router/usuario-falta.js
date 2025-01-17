/*

    UsuarioFalta
    Ruta: '/api/usuario-falta'

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
} = require('../controllers/usuario-falta');

const router = Router();

router.get('/:usuarioId', listar);

router.post('/', [
        validarJWT,
        check('usuario', 'Falta el identificador del usuario.').isMongoId(),
        check('falta', 'Falta el identificador de la falta.').isMongoId(),
        check('supervisor', 'Falta el identificador del supervisor.').isMongoId(),
        check('fechaFalta', 'Fecha de la falta es obligatoria.').not().isEmpty(),
        validarCampos
    ],
    crear);

router.put('/:id', [
        validarJWT,
        check('usuario', 'Falta el identificador del usuario.').isMongoId(),
        check('falta', 'Falta el identificador de la falta.').isMongoId(),
        check('supervisor', 'Falta el identificador del supervisor.').isMongoId(),
        check('fechaFalta', 'Fecha de la falta es obligatoria.').not().isEmpty(),
        validarCampos
    ],
    actualizar);

router.delete('/:id', [
    validarJWT
], eliminar);

module.exports = router;