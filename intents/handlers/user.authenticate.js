const { Payload } = require('dialogflow-fulfillment');

module.exports = async function handleUserAuthenticate(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)

    const fbPayload = {
        "attachment":{
            "type":"template",
            "payload":{
            "template_type":"button",
            "text":"Try the URL button!",
            "buttons":[
                {
                "type":"web_url",
                "url":`http://assistantutt.ga:8080/api/auth?sender_id=${agent.senderId}`,
                "title":"Authentification",
                "webview_height_ratio": "full"
                }
            ]
            }
        }
    }

    const button = new Payload(agent.FACEBOOK, fbPayload, {
        sendAsMessage: true,
    });

    agent.add(`Pour vous authentifier, cliquez sur le lien suivant :`);
    agent.add(`http://assistantutt.ga:8080/api/auth?sender_id=${agent.senderId}`);
    agent.add(button);

}