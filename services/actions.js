  
const sendAPI = require("./graphAPI");

const repliesSurvey={
    texto:'Por favor llena esta encuesta y dime que es lo que mas te gusta de nuestro servicio! :)',
    replies:[
        {
            content_type:"text",
            title:"Servicios",
            payload:'servicio'
        },
        {
            content_type:"text",
            title:"Rapidez",
            payload:'rapidez'
        },
        {
            content_type:"text",
            title:"Ubicacion",
            payload:'ubicacion'
        }
    ]
};
exports.quickReplies=(webhookEvent,replies)=>{
    if(!replies){
        replies = repliesSurvey;
    }
    let response = {
        recipient: {
            id: webhookEvent.sender.id
        },
        message:{
            text:replies.texto,
            quick_replies:replies.replies
        }
    }
    sendAPI.callSendAPI(response);//llamamos a la api de fb
}
exports.sendTextMessage = (texto, webhookEvent)=>{
    let response = {
        recipient: {
            id: webhookEvent.sender.id
        },
        message:{
            text:texto
        }
    }

    //metodo de graph.js
    sendAPI.getProfile(webhookEvent.sender.id);

    sendAPI.callSendAPI(response);
}

//Enviar lista de tiendas
exports.stores = (webhookEvent) =>{//funciona de la mano con handleLocation pero estan deprecative
    let response = {
        recipient:{
          id: webhookEvent.sender.id
        },
        message:{
            attachment:{
            type:"template",
            payload: {
                template_type:"generic",
                elements:[
                {
                    title:"Tienda del centro",
                    image_url:"https://media4.s-nbcnews.com/i/newscms/2017_26/2053956/170627-better-grocery-store-main-se-539p_80a9ba9c8d466788799ca27568ee0d43.jpg",
                    subtitle:"Dirección corta de la tienda",
                    default_action: {
                        type: "web_url",
                        url: "https://goo.gl/maps/J5LQfLPy1s3zvtQZ6",
                        messenger_extensions: "FALSE",
                        webview_height_ratio: "COMPACT"
                    },
                    buttons:[{
                            type:"web_url",
                            url:"https://goo.gl/maps/J5LQfLPy1s3zvtQZ6",
                            title:"Mostrar el mapa"
                          },{
                            "type":"phone_number",
                            "title":"Llama a la tienda",
                            "payload":"+5215525250000"
                    } ]      
                }
            ]
            }
        }
        }
    }
    sendAPI.callSendAPI(response);//llamamos a la api fb para enviarle el objeto creado
}