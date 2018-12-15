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
        const result = await this.existsInContext(this.fetchCallback.bind(this), parameters);

        // We set a context in which we put results of fetched data
        // so we don't have to fetch to the API again.
        if(!result.error) {
            this.agent.setContext({
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
     * This function avoids fetching to API multiple time if something we need
     * to fetch has already been put in context of the session. 
     * @param {function()} callback Callback executed if context is empty.
     * @param {*} parameters Any argument called with the callback function.
     */
    async existsInContext(callback, parameters) {
        const context = this.agent.getContext(this.contextName);

        /**
         * TO DO :
         * La condition que le contexte existe ne suffit pas, il faut également
         * vérifier dans certains cas son contenu pour vérifier qu'il correspond
         * réellement à l'information que l'on souhaite récuperer.
         * On peut penser par exemple pour une UE donnée, le contexte pourrait exister
         * mais le contenu de ce contexte pourrait ne pas correspondre à l'UE recherchée.
         */
        if (context) {
                console.log(`${this.contextName} context already exists, no external fetch required.`);
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
            throw new Error('Tried to access data but it is not loaded.');
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