const createSenderId = require('../helpers/createApiSenderId');
const fetchPrivateUserInfo = require('../helpers/fetchPrivateUserInfo');
const PrivateUserInfo = require('../classes/PrivateUserInfo');

module.exports = async function handleUserPrivateWho(agent) {
    console.log(`${agent.senderId} : ${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)

    try {
        const userInfo = new PrivateUserInfo(agent);
        
        await userInfo.fetchData();
        
        // Checks if response has an error in it. If so it is most likely
        // that user has not authenticated.
        if (!userInfo.isAuthenticatedNextEvent()) return;
    
        let firstName = userInfo.data.firstName.toLowerCase();
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        agent.add(`Je sais, tu es ${firstName} !`);
        return agent.add(`Hé d'ailleurs tu serais pas en ${userInfo.data.uvs[0]} avec moi? ;)`)
        
    } catch(err) {
        console.log(err);
        return agent.add(`Désolé, je n'ai pas réussi à savoir qui tu étais...`);
    }

}