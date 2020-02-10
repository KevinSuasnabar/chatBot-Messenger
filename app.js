const express = require('express'); //ayuda a crear peticions http y routing
const bodyParser = require('body-parser'); //las peticiones que hacemos las convierte a json
require('dotenv').config(); //extraemos las credenciales del archivo .env

//importamos el servicio de envio
const actions = require("./services/actions");

const handle=require("./services/hadleMessages");

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//declaramos el puerto por el que escuchara nuestra aplicacion
app.set('port',process.env.PORT) //extraido del archivo .env

app.listen(app.get('port'),()=>{
    console.log(`iniciado en ${process.env.PORT}`);
});

//para conectarnos con el webhook
app.get('/webhook',(req,res)=>{
    //facebook me envia esto con la peticion por eso se usa el req
    const mode=req.query['hub.mode'];
    
    //nosotros regresamos esta variable cuando verificamos que el token es el mismo
    const challenge=req.query['hub.challenge'];

    //
    const token=req.query['hub.verify_token'];

    if(mode && token){
        //si fb nos envia el mismo token
        if(mode === 'subscribe' && token === process.env.VERIFYTOKEN){

            
        console.log('Webhook Listo!!');
        res.status(200).send(challenge);

        }else{
            res.status(403);
        }
   
    }

});

app.post("/webhook",(req,res)=>{

    //recibimos el cuerpo de la peticion
    const body=req.body;

    if(body.object === "page"){
        res.status(200).send("EVENT_RECEIVED");
        body.entry.forEach(function(entry){
            let webhookEvent=entry.messaging[0];
            console.log(webhookEvent);

            //maneja el tipo de mensaje que nos envia
            handle.handleMessage(webhookEvent);

            //usamos el servicio actions importado
            //actions.sendTextMessage("Este es mu chatBot hola Mundo!",webhookEvent);
        });
    }else{
        console.log("hay error");
        res.sendStatus(404);
    }
});


//ruta para estar seguros de que se levanta el server
app.get('/',(req,res)=>{
    res.send('Hola Mundo!!');
});
