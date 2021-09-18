const { Router } = require('express');
const router = Router();
const { login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/', [
    check('password', 'password requerido').not().isEmpty(),
    check('email', 'email requerido').isEmail(),
    validarCampos
], login);

router.get('/renew',
    validarJWT,
    renewToken
);




module.exports = router;