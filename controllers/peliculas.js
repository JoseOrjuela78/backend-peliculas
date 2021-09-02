 const Pelicula = require('../models/peliculas');

 const getPeliculas = async(req, res) => {

     const usuarios = await Pelicula.find();

     res.json({
         ok: true,
         usuarios
     });

 }

 const crearPelicula = async(req, res) => {

     const pelicula = new Pelicula(req.body);

     await pelicula.save();

     res.json({
         ok: true,
         pelicula
     });

 };


 const actualizarPelicula = async(req, res) => {

     const iud = req.params.id;


     try {

         const usuarioDb = await Pelicula.findById(iud);
         if (!usuarioDb) {
             return res.status(404).json({
                 ok: false,
                 msj: 'pelicula no existe'
             });
         }

         const campos = req.body;
         delete campos._id;

         const peliculaActualizada = await Pelicula.findByIdAndUpdate(iud, campos, { new: true });

         res.json({
             ok: true,
             peliculaActualizada
         });

     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false,
             mjs: "error inesperado"
         });
     }

 };

 const borrarPelicula = async(req, res) => {

     const iud = req.params.id;


     try {

         const usuarioDb = await Pelicula.findById(iud);
         if (!usuarioDb) {
             return res.status(404).json({
                 ok: false,
                 msj: 'pelicula no existe'
             });
         }

         await Pelicula.findByIdAndDelete(iud);

         res.json({
             ok: true,
             msj: 'pelicula Borrada'
         });

     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false,
             mjs: "error inesperado"
         });
     }

 };


 module.exports = {
     getPeliculas,
     crearPelicula,
     actualizarPelicula,
     borrarPelicula

 };