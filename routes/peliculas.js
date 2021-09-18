const { Router } = require('express');
const router = Router();
const fileUpload = require('express-fileupload');
const {
    getPeliculas,
    getIdPeliculas,
    getBusqueda,
    crearPelicula,
    actualizarPelicula,
    borrarPelicula,
    subirCaratula,
    retornaImgen
} = require('../controllers/peliculas');



router.use(fileUpload());
//ruta: /api/peliculas
router.get('/', getPeliculas);
router.get('/:id', getIdPeliculas);
router.get('/buscar/:busqueda', getBusqueda);
router.post('/', crearPelicula);
router.put('/:id', actualizarPelicula);
router.delete('/:id', borrarPelicula);
router.put('/uploads/:tipo/:id', subirCaratula);
router.get('/uploads/:tipo/:imgId', retornaImgen);


module.exports = router;