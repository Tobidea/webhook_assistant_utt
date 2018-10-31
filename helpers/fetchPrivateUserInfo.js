const fetch = require('node-fetch');

module.exports = async function fetchPrivateUserInfo(senderId) {

    const result = fetch('http://assistantutt.ga:8080/api/private/account', {
        method: 'GET',
        headers: {
            'Sender-Id': senderId,
        },
    })  .then((info) => info.json());

    return result;
}