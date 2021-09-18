const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {

    // leer token

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'token vacio'
        });
    }

    try {

        const { iud } = jwt.verify(token, process.env.JWT_SECRET);

        req.iud = iud;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });

    }




}

module.exports = {
    validarJWT
};