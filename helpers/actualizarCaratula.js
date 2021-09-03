const Pelicula = require('../models/peliculas');
const fs = require('fs');

const actualizarImagen = async(id, nombreArchivo) => {

    const pelicula = await Pelicula.findById(id);

    if (!pelicula) {
        return false;
    }

    const pathPrevio = `./caratulas/${pelicula.img}`;


    if (fs.existsSync(pathPrevio)) {
        fs.unlinkSync(pathPrevio);
    }


    await Pelicula.findByIdAndUpdate(id, { img: nombreArchivo });

    return true;

};

module.exports = {
    actualizarImagen
};