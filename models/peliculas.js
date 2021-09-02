const { Schema, model } = require('mongoose');

const PeliculaSchema = Schema({
    nombre: {
        type: String,
        required: true

    },
    bio: {

        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },

    duracion: {

        type: Number,
        required: true

    },
    categoria: {
        type: String,
        required: true

    },
    trailer: {
        type: String,
        required: true

    },
    aparicion: {
        type: Date,
        required: true

    },
    casa: {
        type: String,
        required: true

    },
    puntuacion: {
        type: Number,
        required: true

    },


});

module.exports = model('Pelicula', PeliculaSchema);