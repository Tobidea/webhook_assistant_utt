const fetch = require('node-fetch');
const Fetcher = require('./Fetcher');

/**
 * This class represents a user private informations.
 * Whenever a PrivareUserInfo object is instanciated, it fetches informations of agent.senderId
 * in the API and fills its attributes with the results.
 */
class PrivateUserInfo extends Fetcher {
    constructor(agent) {
        super(agent); 
        this.contextName = 'private-user-info'; // Name of the context it generates after fetching succesfully data
    }

    async fetchCallback() {
        const result = await fetch('http://assistantutt.ga:8080/api/users/private/account', {
            method: 'GET',
            headers: {
                'Sender-Id': this.agent.senderId,
            },
        })  .then((info) => info.json());
    
        return result;
    }
}

module.exports = PrivateUserInfo;