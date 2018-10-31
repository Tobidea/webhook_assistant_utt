const fetch = require('node-fetch');
const createSenderId = require('../helpers/createApiSenderId');

module.exports = async function handleUserAuthenticate(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)

    const senderId = createSenderId(agent);


    agent.add(`Bonjour ${senderId}`);
}