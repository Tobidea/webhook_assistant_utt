const fetch = require('node-fetch');
const _ = require('lodash');

/**
 * This class represents a fetcher.
 * It shouldn't be instanciated as it is and must be inherited.
 * fetchCallback method should be redefined and context name changed.
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
        const result = await this.existsInContext({
            parameters,
            callback: this.fetchCallback.bind(this),
            contextCheckerCallback: this.contextCheckerCallback.bind(this),
        });

        // We set a context in which we put results of fetched data
        // so we don't have to fetch to the API again.
        if(!result.error) {
            this.agent.context.set({
                name: this.contextName,
                lifespan: '5',
                parameters: result,
            });
        }
        
        this.data = result;
        return result;
    }

    /**
     * This method has to be redefined in its subclasses.
     * It should return results of fetching data in some kind of API.
     */
    async fetchCallback(parameters) {
        throw new Error('fetchCallback() method should be redefined in subclasses.')
    }

    /**
     * Optional method to be redefined in its subclasses.
     * Represents the condition to make a new API call or just use
     * context as the result of fetching.
     * @return A boolean
     */
    contextCheckerCallback(context) {
        return context;
    }

    /** 
     * This function avoids fetching to API multiple time if something we need
     * to fetch has already been put in context of the session.
     * @param {Object} args
     * @param {function(*): Object} args.callback Callback executed if context is empty.
     * @param {*} args.parameters Any argument called with the callback function.
     * @param {function(*): boolean} [args.contextCheckerCallback] Callback returning a boolean. Used to check specific conditions
     */
    async existsInContext({callback, parameters, contextCheckerCallback = (context) => context}) {
        const context = this.agent.context.get(this.contextName);

        if (contextCheckerCallback(context, parameters)) {
            console.log(`${this.contextName} context already exists, no external API fetch required.`);
            this._hasLoaded = true;
            return context.parameters;
        } else {
            const result = await callback(parameters);
            if (!result.error) this._hasLoaded = true;
            return result;
        }
     }

    /**
     * Checks if after fetching data, an error field has been sent or not
     * @return A boolean indicating if user is authenticated or not
     */
    isAuthenticated() {
        /**
         * TO DO : 
         * Cette méthode ne correspond pas vraiment à tous les Fetchers
         * mais seulement à ceux qui nécessitent une authentification...
         */
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
        if (!this.hasLoaded) {
            throw new Error('Tried to access data but it has not loaded.');
        }
    }

    /**
     * Checks if data has loaded or not
     * @return A boolean
     */
    get hasLoaded() {
        return this._hasLoaded;
    }
}

module.exports = Fetcher;