const { Payload } = require('dialogflow-fulfillment');

module.exports = async function handleUserAuthenticate(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)

    const fbPayloadOptions = {
        "attachment":{
            "type":"template",
            "payload":{
            "template_type":"button",
            "text":"Appuie sur le bouton pour t'authentifier.",
            "buttons":[
                {
                "type":"web_url",
                "url":`http://assistantutt.ga:8080/api/auth?sender_id=${agent.senderId}`,
                "title":"Authentification avec son compte UTT",
                "webview_height_ratio": "tall"
                }
            ]
            }
        }
    }

    const fbButton = new Payload(agent.FACEBOOK, fbPayloadOptions, {
        sendAsMessage: true,
    });

    agent.add(`Pour t'authentifier, allez sur le lien suivant :`);
    agent.add(`http://assistantutt.ga:8080/api/auth?sender_id=${agent.senderId}`);
    agent.add(fbButton);

}