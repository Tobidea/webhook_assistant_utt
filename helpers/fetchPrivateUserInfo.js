const fetch = require('node-fetch');

module.exports = async function fetchPrivateUserInfo(senderId, agent) {

    const result = await fetch('http://assistantutt.ga:8080/api/users/private/account', {
        method: 'GET',
        headers: {
            'Sender-Id': senderId,
        },
    })  .then((info) => info.json());

    if(!result.error) {
        agent.setContext({
            name: 'privateUserInfo',
            lifespan: '5',
            parameters: result,
        });
    }


    return result;
}