const createSenderId = require('../helpers/createApiSenderId');
const fetchPrivateUserInfo = require('../helpers/fetchPrivateUserInfo');
const controlAuth = require('../helpers/controlAuthentication');

module.exports = async function handleUserPrivateWho(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)

    const senderId = createSenderId(agent);
    try {
        const result = await fetchPrivateUserInfo(senderId);
        
        if (result.error) {
            return agent.setFollowupEvent('error_USER_NOT_AUTHENTICATED');
        } else {
            console.log(result);
            let firstName = result.firstName.toLowerCase();
            firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            agent.add(`Je sais, tu es ${firstName} !`);
            return agent.add(`Hé d'ailleurs tu serais pas en ${result.uvs[0]} avec moi? ;)`)
        }
    } catch(err) {
        console.log(err);
        return agent.add(`Désolé, je n'ai pas réussi à savoir qui tu étais...`);
    }

}