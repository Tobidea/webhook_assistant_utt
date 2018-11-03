const fetch = require('node-fetch');

/**
 * This class represents a fetcher.
 * It shouldn't be instanciated as it is and must be inherited.
 * rawFetchData method should be redefined and context name changed.
 */
module.exports = class Fetcher {
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
     */
    async rawFetchData() {
        throw new Error('rawFetchData() method should be redefined in subclasses.')
    }

    /** 
     * This is function avoids fetching to API multiple time if something we need
     * to fetch has already been put in context of the session. 
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

    isAuthenticated() {
        return !this.data.error;
    }

    isAuthenticatedNextEvent() {
        if(this.isAuthenticated()) {
            return true;
        } else {
            this.agent.setFollowupEvent('error_USER_NOT_AUTHENTICATED');
            return false;
        }
    }


    hasLoadedCheck() {
        if (!this.hasLoaded()) {
            throw new Error('Tried to access data but it is not loaded.');
        }
    }

    hasLoaded() {
        return this._hasLoaded;
    }
}