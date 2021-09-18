const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const {
    getUsuarios,
    getIdUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario

} = require('../controllers/usuarios');





router.get('/', validarJWT, getUsuarios);

router.get('/:id', getIdUsuarios);

router.post('/', [
    check('nombre', 'nombre requerido').not().isEmpty(),
    check('password', 'password requerido').not().isEmpty(),
    check('email', 'email requerido').isEmail(),
    validarCampos

], crearUsuario);

router.put('/:id', [
    validarJWT,
    check('nombre', 'nombre requerido').not().isEmpty(),
    check('email', 'email requerido').isEmail(),
    check('role', 'role requerido').not().isEmpty(),
    validarCampos

], actualizarUsuario);

router.delete('/:id', validarJWT, borrarUsuario);



module.exports = router;