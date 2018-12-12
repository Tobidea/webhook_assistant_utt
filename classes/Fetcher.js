const fetch = require('node-fetch');

/**
 * This class represents a fetcher.
 * It shouldn't be instanciated as it is and must be inherited.
 * rawFetchData method should be redefined and context name changed.
 */
class Fetcher {

    /**
     * @param {WebhookClient} agent Dialogflow's WebhookClient agent object.
     */
    constructor(agent) {
        this.agent = agent;
        this.contextName = '';
        this.data = {};
        this._hasLoaded = false;
    }
    
    /**
     * Fetch data and assign it (and checks if data exists in context)
     */
    async fetchData(parameters) {
        const data = await this.existsInContext(this.rawFetchData.bind(this), parameters);
    
        this.data = data;
        return data;
    }

    /**
     * This method has to be redefined in its subclasses.
     * It should return results of fetching data in some kind of API.
     */
    async rawFetchData() {
        throw new Error('rawFetchData() method should be redefined in subclasses.')
    }

    /** 
     * This function avoids fetching to API multiple time if something we need
     * to fetch has already been put in context of the session. 
     * @param {function()} callback Callback executed if context is empty.
     */
    async existsInContext(callback) {
        const context = this.agent.getContext(this.contextName);

        if (context) {
                console.log(`${this.contextName} context already exists, no fetch required.`);
                this._hasLoaded = true;
                return context.parameters;
        } else {
                const result = await callback();
                if (!result.error) this._hasLoaded = true;
                return result;
        }
     }

    /**
     * Checks if after fetching data, an error field has been sent or not
     * @return A boolean indicating if user is authenticated or not
     */
    isAuthenticated() {
        return !this.data.error;
    }

    /**
     * Checks if user is authenticated, and sets follow-up event to
     * error_USER_NOT_AUTHENTICATED
     * @return A boolean indicatif is user is authenticated or not
     */
    isAuthenticatedNextEvent() {
        if(this.isAuthenticated()) {
            return true;
        } else {
            this.agent.setFollowupEvent('error_USER_NOT_AUTHENTICATED');
            return false;
        }
    }

    /**
     * Checks if data has loaded or not. If not, it throws an error.
     */
    hasLoadedCheck() {
        if (!this.hasLoaded()) {
            throw new Error('Tried to access data but it is not loaded.');
        }
    }

    /**
     * Checks if data has loaded or not
     * @return A boolean
     */
    hasLoaded() {
        return this._hasLoaded;
    }

    /**
     * @return Returns data fetched by fetchData() function.
     */
    get data() {
        return this.data;
    }
}

module.exports = Fetcher;