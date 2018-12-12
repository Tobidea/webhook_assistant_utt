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

    async rawFetchData() {
        const result = await fetch('http://assistantutt.ga:8080/api/users/private/account', {
            method: 'GET',
            headers: {
                'Sender-Id': this.agent.senderId,
            },
        })  .then((info) => info.json());
    
        // We set a context in which we put results of fetched data
        // so we don't have to fetch to the API again.
        if(!result.error) {
            this.agent.setContext({
                name: this.contextName,
                lifespan: '5',
                parameters: result,
            });
        }
    
        return result;
    }
}

module.exports = PrivateUserInfo;