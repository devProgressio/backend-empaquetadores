/*

    toma-turno
    Ruta: '/api/toma-turno'

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    listar,
    listarTodo,
    activar,
    desactivar,
    obtenerPlanillaActiva,
    obtenerTomaTurnoActiva
} = require('../controllers/toma-turno');

const router = Router();

router.get('/', validarJWT, listar);

router.get('/todo', validarJWT, listarTodo);

router.get('/planilla-activa', validarJWT, obtenerPlanillaActiva);
router.get('/toma-turno-activa', validarJWT, obtenerTomaTurnoActiva);

router.post('/', [
    validarJWT,
    validarCampos
],
activar);

router.put('/:id', [
    validarJWT,
    check('planilla', 'Falta el identificador de la planilla').not().isEmpty(),
    validarCampos
],
desactivar);

module.exports = router;