const isAlreadyInContext = require('../helpers/isAlreadyInContext');
const fetchPrivateUserInfo = require('../helpers/fetchPrivateUserInfo');

module.exports = async function handleUserPrivateUeFollowed(agent) {
    try {
        console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)
        
        const userInfo = await isAlreadyInContext({
        agent,
        contextName: 'privateUserInfo',
        callback: async () => {
            return await fetchPrivateUserInfo(agent.senderId);
        }
    });

    console.log(userInfo);
    
    // To create the list of UEs
    const ueString = userInfo.uvs.reduce((accumulator, currentUv) => (
        accumulator + ', ' + currentUv
        ));
        
        return agent.add(`Vos UE ce semestre sont ${ueString}.`);
    } catch (err) {
        console.log(err);
        return agent.add(`J'ai eu un soucis en essayant de savoir vos UE !`);
    }
    
}