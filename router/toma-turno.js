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
} = require('../controllers/toma-turno');

const router = Router();

router.get('/', validarJWT, listar);

router.get('/', validarJWT, listar);

module.exports = router;