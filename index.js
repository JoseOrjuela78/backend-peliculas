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

// rutas

//mongo user: jaorjuelaa pass: RrjNU3paODYP04AC

app.use('/api/peliculas', require('./routes/peliculas'));


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto : ' + process.env.PORT)
});