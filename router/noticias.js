/*

    Noticias
    Ruta: '/api/noticias'

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
} = require('../controllers/noticias');

const router = Router();

router.get('/', validarJWT, listar);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('glosa', 'La descripción es obligatoria').not().isEmpty(),
        check('activaHasta', 'La fecha y hora activa son obligatorias').not().isEmpty(),
        check('usuario', 'Falta el identificador del usuario.').isMongoId(),
        validarCampos
    ],
    crear
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizar);

router.delete('/:id', [
    validarJWT,
    eliminar
]);

module.exports = router;