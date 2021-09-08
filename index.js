require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { dbConenection } = require('./database/config');

// cors

app.use(cors());

//lectura del body

app.use(express.json());

//Base de datos

dbConenection();

// Directorio público
app.use(express.static('public'));

// rutas

app.use('/api/peliculas', require('./routes/peliculas'));

//servidors

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto : ' + process.env.PORT)
});