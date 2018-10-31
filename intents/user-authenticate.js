const createSenderId = require('../helpers/createApiSenderId');

module.exports = async function handleUserAuthenticate(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)

    const senderId = createSenderId(agent);

    agent.add(`Pour vous authentifier, cliquez sur le lien suivant :`);
    agent.add(`http://assistantutt:8080/api/auth?sender_id=${senderId}`);
    agent.setFollowupEvent('error_USER_NOT_AUTHENTICATED');
}