const createSenderId = require('../helpers/createApiSenderId');
const fetchPrivateUserInfo = require('../helpers/fetchPrivateUserInfo');
const controlAuth = require('../helpers/controlAuthentication');

module.exports = async function handleUserPrivateWho(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)

    const senderId = createSenderId(agent);
    try {
        const result = await fetchPrivateUserInfo(senderId);
        
        if (response.error) {
            return agent.setFollowupEvent('error_USER_NOT_AUTHENTICATED');
        } else {
            return agent.add(`Tu es ${result.firstname} non?`);
        }
    } catch(err) {
        console.log(err);
        return agent.add(`Désolé, je n'ai pas réussi à savoir qui tu étais...`);
    }

}