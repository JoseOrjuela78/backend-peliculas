const Usuario = require('../models/usuarios');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find();


    res.json({
        ok: true,
        usuarios
    });

};


getIdUsuarios = (req, res) => {


    res.json({
        ok: true,
        msg: 'id Usuario'
    });

};


const crearUsuario = async(req, res = response) => {

    const { password, email } = req.body;
    const usuario = new Usuario(req.body);

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {

            return res.status(400).json({
                ok: false,
                msg: 'Correo duplicado'

            });

        }

        //encriptar password

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Crear usuario
        await usuario.save();

        //generar token

        const token = await generarJWT(usuario._id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error revisar Logs'

        });

    }


};




const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById({ _id: uid });

        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario'

            });

        }

        const campos = req.body;

        if (usuarioDB.email === req.body.email) {
            delete campos.email;
        } else {

            const existeEmail = await Usuario.findOne({ email: req.body.email });

            if (existeEmail) {

                return res.status(400).json({
                    ok: false,
                    msg: 'Correo duplicado'

                });

            }


        }


        delete campos.password;
        delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });



    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error revisar Logs'

        });

    }


    res.json({
        ok: true,
        msg: 'Actualizar Usuario'
    });

};





const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById({ _id: uid });

        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario'

            });

        }

        const usuarioBorrado = await Usuario.findByIdAndDelete({ _id: uid });


        res.json({
            ok: true,
            msg: 'Usuario Borrado'
        });

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error revisar Logs'

        });

    }



};



module.exports = {
    getUsuarios,
    getIdUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};