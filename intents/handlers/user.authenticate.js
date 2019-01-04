const { Payload } = require('dialogflow-fulfillment');

module.exports = async function handleUserAuthenticate(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)

    const fbPayloadOptions = {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Pour te connecter, clique sur le bouton et connecte toi via le CAS de l'UTT ",
                "buttons":[{
                    "type":"web_url",
                    "url":`http://assistantutt.ga:8080/api/auth?sender_id=${agent.senderId}`,
                    "title":"S'authentifier",
                    "webview_height_ratio": "full"
                }]
            }
        }
    }

    const fbButton = new Payload(agent.FACEBOOK, fbPayloadOptions);

    agent.add(`Pour t'authentifier via le CAS, connecte toi dans le lien suivant :`);
    agent.add(`http://assistantutt.ga:8080/api/auth?sender_id=${agent.senderId}`);
    agent.add(fbButton);

}