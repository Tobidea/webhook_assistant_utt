const fetch = require('node-fetch');

module.exports = async function fetchPrivateUserInfo(senderId) {

    const result = await fetch('http://assistantutt.ga:8080/api/users/private/account', {
        method: 'GET',
        headers: {
            'Sender-Id': senderId,
        },
    })  .then((info) => info.json());

    console.log(result);

    return result;
}