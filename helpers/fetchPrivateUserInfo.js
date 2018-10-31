const fetch = require('node-fetch');

module.exports = async function fetchPrivateUserInfo(agent) {

    const result = await fetch('http://assistantutt.ga:8080/api/users/private/account', {
        method: 'GET',
        headers: {
            'Sender-Id': agent.senderId,
        },
    })  .then((info) => info.json());

    if(!result.error) {
        agent.setContext({
            name: 'private-user-info',
            lifespan: '5',
            parameters: result,
        });
    }


    return result;
}