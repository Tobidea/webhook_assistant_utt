const fetch = require('node-fetch');

/**
 * This class represents a user private informations.
 * Whenever a PrivareUserInfo object is instanciated, it fetches informations of agent.senderId
 * in the API and fills its attributes with the results.
 */
module.exports = class PrivateUserInfo {
    constructor(agent) {
        this.agent = agent; 
        this.contextName = 'private-user-info';
        this.data = {}
    }
    
    /**
     * Fetch data and assign it (and checks if data exists in context)
     */
    async fetchData() {
        const data = await this.existsInContext(this.rawFetchData);
    
        this.data = {...this.data, data};
        return data
    }

    async rawFetchData() {
        const result = await fetch('http://assistantutt.ga:8080/api/users/private/account', {
            method: 'GET',
            headers: {
                'Sender-Id': this.agent.senderId,
            },
        })  .then((info) => info.json());
    
        if(!result.error) {
            this.agent.setContext({
                name: 'private-user-info',
                lifespan: '5',
                parameters: result,
            });
        }
    
        return result;
    }

    /** 
     * This is function avoids fetching to API multiple time if something we need
     * to fetch has already been put in context of the session. 
     */
    async existsInContext(callback) {
        const context = this.agent.getContext(this.contextName);

        if (context) {
                console.log(`${this.contextName} context already exists, no fetch required.`)
                return context.parameters;
        } else {
                return await callback();
        }
     }

    isAuthenticated() {
        return !this.error;
    }

    checkAuthentication() {
        if(this.isAuthenticated()) {
            return true;
        } else {
            this.agent.setFollowupEvent('error_USER_NOT_AUTHENTICATED');
            return false;
        }
    }
}