require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { dbConenection } = require('./database/config');

// cors

app.use(cors());


//Bese de datos

dbConenection();

// rutas

//mongo user: jaorjuelaa pass: RrjNU3paODYP04AC

app.get('/', (req, res) => {

    res.json({
        ok: true,
        msj: 'hello world'
    });

});



app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto : ' + process.env.PORT)
})