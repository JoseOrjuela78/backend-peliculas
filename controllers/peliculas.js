 const pathCompleto = require('path');
 const fs = require('fs');
 const Pelicula = require('../models/peliculas');
 const { response } = require('express');
 const { actualizarImagen } = require('../helpers/actualizarCaratula');
 const { v4: uuidv4 } = require('uuid');


 const getPeliculas = async(req, res) => {

     const peliculas = await Pelicula.find();

     res.json({
         ok: true,
         peliculas
     });

 };

 const getIdPeliculas = async(req, res) => {

     const iud = req.params.id;

     const pelicula = await Pelicula.findById(iud);

     res.json({
         ok: true,
         pelicula
     });

 };

 const getBusqueda = async(req, res) => {

     const busqueda = req.params.busqueda;

     const regex = new RegExp(busqueda, 'i');

     const peliculas = await Pelicula.find({ nombre: regex });

     res.json({
         ok: true,
         peliculas
     });

 };


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


 const subirCaratula = (req, res = response) => {

     const tipo = req.params.tipo;
     const id = req.params.id;

     if (!req.files || Object.keys(req.files).length === 0) {
         return res.status(400).json({
             ok: false,
             mjs: "no se anexo ninguna caratula"
         });
     }

     const file = req.files.imagen;
     const nombreCortado = file.name.split('.');
     const tipoArchivo = nombreCortado[nombreCortado.length - 1];
     const tiposValidos = ['png', 'jpg', 'jpeg', 'git'];

     if (!tiposValidos.includes(tipoArchivo)) {
         return res.status(400).json({
             ok: false,
             mjs: "no es una extension valida"
         });
     }
     //nombre imagen
     const nombreIndexado = `${uuidv4()}.${tipoArchivo}`;
     //path

     const path = `./${tipo}/${nombreIndexado}`;

     file.mv(path, (err) => {
         if (err) {
             console.log(err);
             return res.status(500).json({
                 ok: false,
                 msj: 'error al guardar img'
             });
         }

         actualizarImagen(id, nombreIndexado);

         res.json({
             ok: true,
             msj: 'imagen guardada',
             nombreIndexado
         });
     });



 };



 const retornaImgen = (req, res = response) => {

     const img = req.params.imgId;

     const pathImg = pathCompleto.join(__dirname, `../caratulas/${img}`);

     if (fs.existsSync(pathImg)) {
         res.sendFile(pathImg);
     } else {
         const pathImg = pathCompleto.join(__dirname, `../caratulas/no-img.png`);
         res.sendFile(pathImg);
     }

 };


 module.exports = {
     getPeliculas,
     getIdPeliculas,
     crearPelicula,
     actualizarPelicula,
     borrarPelicula,
     getBusqueda,
     subirCaratula,
     retornaImgen

 };