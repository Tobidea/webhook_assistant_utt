const createSenderId = require('../helpers/createApiSenderId');

module.exports = async function handleUserPrivateWho(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)

    const senderId = createSenderId(agent);

}