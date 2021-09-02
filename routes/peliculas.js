const { Router } = require('express');
const router = Router();
const { getPeliculas, crearPelicula, actualizarPelicula, borrarPelicula } = require('../controllers/peliculas');

//ruta: /api/peliculas

router.get('/', getPeliculas);
router.post('/', crearPelicula);
router.put('/:id', actualizarPelicula);
router.delete('/:id', borrarPelicula);

module.exports = router;