  
const sendAPI = require("./graphAPI");

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