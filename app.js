const express = require('express'); //ayuda a crear peticions http y routing
const bodyParser = require('body-parser'); //las peticiones que hacemos las convierte a json
require('dotenv').config(); //extraemos las credenciales del archivo .env


const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//declaramos el puerto por el que escuchara nuestra aplicacion
app.set('port',process.env.PORT) //extraido del archivo .env

app.listen(app.get('port'),()=>{
    console.log(`iniciado en ${process.env.PORT}`);
});

//ruta para estar seguros de que se levanta el server
app.get('/',(req,res)=>{
    res.send('Hola Mundo!!');
});

//MIN 27:00