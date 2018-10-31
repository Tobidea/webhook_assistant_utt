const createSenderId = require('../helpers/createApiSenderId');

module.exports = async function handleUserAuthenticate(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)

    agent.add(`Pour vous authentifier, cliquez sur le lien suivant :`);
    agent.add(`http://assistantutt.ga:8080/api/auth?sender_id=${agent.senderId}`);
}