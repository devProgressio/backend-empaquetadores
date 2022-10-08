/*

    Calendario
    Ruta: '/api/calendario'

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    listarPorPlanilla,
    listarTurnosValidos,
    crear,
    actualizar,
    eliminar
} = require('../controllers/calendario');

const router = Router();

router.get('/:planillaId', validarJWT, listarPorPlanilla);

router.get('/turnos/:planillaId', validarJWT, listarTurnosValidos);

router.post('/', [
        validarJWT,
        check('planillaId', 'Falta el identificador de la planilla.').isMongoId(),
        check('fechaHoraInicio', 'La fecha inicio del turno necesaria.').not().isEmpty(),
        check('fechaHoraTermino', 'La fecha término del turno necesaria.').not().isEmpty(),
        check('cantidad', 'La cantidad es necesaria.').not().isEmpty(),
        validarCampos
    ],
    crear);

router.put('/:id', [
        validarJWT,
        check('planillaId', 'Falta el identificador de la planilla.').not().isEmpty(),
        check('fechaHoraInicio', 'La fecha inicio del turno necesaria.').not().isEmpty(),
        check('fechaHoraTermino', 'La fecha término del turno necesaria.').not().isEmpty(),
        check('cantidad', 'La cantidad es necesaria.').not().isEmpty(),
        validarCampos
    ],
    actualizar);

router.delete('/:id', [
    validarJWT
], eliminar);

module.exports = router;