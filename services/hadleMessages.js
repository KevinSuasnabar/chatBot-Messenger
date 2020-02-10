const actions = require("./actions");

exports.handleMessage=(webhookEvent)=>{
    if(webhookEvent.message){
        let mensaje=webhookEvent.message;
        if(mensaje.quick_reply){
            handleQuickReplies(webhookEvent);
        }else if(mensaje.attachments){
            actions.stores(webhookEvent);
        }else if(mensaje.text){
            console.log("Envio texto");
            actions.sendTextMessage("Has enviado tedxto",webhookEvent);
        }
    }else if(webhookEvent.postback){
        handlePostback(webhookEvent);
    }
}

handlePostback=(webhookEvent)=>{
    let evento=webhookEvent.postback.payload;
    switch(evento){
        case 'encuestas':
                actions.quickReplies(webhookEvent);
            break;
        case 'sucursales':
                handleLocation(webhookEvent);
            break;
        case 'inicio':
                actions.sendTextMessage("Bienvenido a este chatBot mano",webhookEvent);
            break;    
    }

}


handleQuickReplies=(webhookEvent)=>{
    let reply= webhookEvent.message.quick_reply.payload;//obtenemos el identificador del boton presionado
    const response={
        texto:"Nos recomiendas mano?",
        replies:[
            {
                content_type:"text",
                title:'Si',
                payload:"siRecomienda"
            },
            {
                content_type:"text",
                title:'No',
                payload:"noRecomienda"
            }
            
        ]
    }
    if(reply=='rapidez' || reply=='ubicacion' || reply=='servicio'){
        actions.quickReplies(webhookEvent,response);
    }else{
        actions.sendTextMessage("Gracias por ayudarnos a mejorar causa",webhookEvent);
    }
}

handleLocation = (webhookEvent) => {//para obtener uicacion pero ya no se puede por nuevas politicas de facebook
    const repliesLocation = {
      texto:'Por favor compartenos tu ubicación para encontrar sucursales cercanas a ti',
      replies:[
        {
            content_type:"location"//esta deprecative
        }
    ]};
    actions.quickReplies(webhookEvent,repliesLocation); 
  }