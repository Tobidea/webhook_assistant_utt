const PrivateUserInfo = require('../../classes/PrivateUserInfo');

/**
 * Send user's courses this semester.
 */
module.exports = async function handleUserPrivateUeFollowed(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)} and contexts ${JSON.stringify(agent.contexts)}`);
    
    try {
        const userInfo = new PrivateUserInfo(agent);
        await userInfo.fetchData();
        if (!userInfo.isAuthenticatedNextEvent()) return;


    // To stringify the list of UEs
    const ueString = userInfo.data.uvs.reduce((accumulator, currentUv) => (
        accumulator + ', ' + currentUv
        ));
        
        return agent.add(`Tes UE ce semestre sont ${ueString}.`);
    } catch (err) {
        console.log(err);
        return agent.add(`J'ai eu un soucis en essayant de retrouver tes UE !`);
    }
}