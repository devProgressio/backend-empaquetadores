/*

    Faltas
    Ruta: '/api/faltas'

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    obtener,
    crear,
    actualizar,
    eliminar
} = require('../controllers/faltas');

const router = Router();

router.get('/', validarJWT, obtener);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('glosa', 'La glosa es obligatoria').not().isEmpty(),
        check('gravedad', 'La gravedad es obligatoria.').not().isEmpty(),
        validarCampos
    ],
    crear
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('glosa', 'La glosa es obligatoria').not().isEmpty(),
        check('gravedad', 'La gravedad es obligatoria.').not().isEmpty(),
        validarCampos
    ],
    actualizar);

router.delete('/:id', [
    validarJWT,
    eliminar
]);

module.exports = router;