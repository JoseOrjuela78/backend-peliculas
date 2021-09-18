const Usuario = require('../models/usuarios');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;


    try {

        // verificar email

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Datos no validos'
            });
        }

        // verificar contraseña

        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos no validos'
            });

        }

        //generar token

        const token = await generarJWT(usuarioDB._id);

        res.json({
            ok: true,
            token
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador'

        });

    }

};


const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);


    res.json({
        ok: true,
        token
    });

}




module.exports = {
    login,
    renewToken
};