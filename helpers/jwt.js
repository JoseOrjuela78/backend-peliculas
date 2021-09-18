const jwt = require('jsonwebtoken');

const generarJWT = (iud) => {

    return new Promise((resolve, reject) => {

        const payload = {

            iud

        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {

            if (err) {

                console.log(err);
                reject('error al generar token');

            } else {

                resolve(token);
            }


        });


    });


};

module.exports = {
    generarJWT
};