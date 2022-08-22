/*

    Planillas
    Ruta: '/api/planillas'

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getPlanillas,
    crearPlanilla,
    actualizarPlanilla,
    eliminarPlanilla
} = require('../controllers/planillas');

const router = Router();

router.get('/', validarJWT, getPlanillas);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la planilla es necesario.').not().isEmpty(),
        check('glosa', 'La descripción de la planilla es necesaria.').not().isEmpty(),
        check('fechaHoraInicio', 'La fecha Inicio de la planilla es necesaria.').not().isEmpty(),
        check('fechaHoraTermino', 'La fecha Término de la planilla es necesaria.').not().isEmpty(),
        validarCampos
    ],
    crearPlanilla
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la planilla es necesario.').not().isEmpty(),
        check('glosa', 'La descripción de la planilla es necesaria.').not().isEmpty(),
        check('fechaHoraInicio', 'La fecha Inicio de la planilla es necesaria.').not().isEmpty(),
        check('fechaHoraTermino', 'La fecha Término de la planilla es necesaria.').not().isEmpty(),
        validarCampos
    ],
    actualizarPlanilla);

router.delete('/:id', [
    validarJWT
], eliminarPlanilla);

module.exports = router;