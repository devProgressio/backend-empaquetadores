/*

    Planillas
    Ruta: '/api/planillas'

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
} = require('../controllers/planillas');

const router = Router();

router.get('/', validarJWT, listar);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la planilla es necesario.').not().isEmpty(),
        check('glosa', 'La descripción de la planilla es necesaria.').not().isEmpty(),
        check('fechaHoraInicio', 'La fecha Inicio de la planilla es necesaria.').not().isEmpty(),
        check('fechaHoraTermino', 'La fecha Término de la planilla es necesaria.').not().isEmpty(),
        validarCampos
    ],
    crear
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la planilla es necesario.').not().isEmpty(),
        check('glosa', 'La descripción de la planilla es necesaria.').not().isEmpty(),
        check('fechaHoraInicio', 'La fecha Inicio de la planilla es necesaria.').not().isEmpty(),
        check('fechaHoraTermino', 'La fecha Término de la planilla es necesaria.').not().isEmpty(),
        validarCampos
    ],
    actualizar);

router.delete('/:id', [
    validarJWT
], eliminar);

module.exports = router;