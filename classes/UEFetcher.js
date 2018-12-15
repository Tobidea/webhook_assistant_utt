const Fetcher = require('./Fetcher');
const fetch = require('node-fetch');

class UEFetcher extends Fetcher {

    constructor(agent) {
        super(agent);
        this.contextName = 'ue-info';
    }

    async fetchCallback(code) {
        console.log('api fetch for', code);
        return await fetch(`http://assistantutt.ga:8080/api/ue/${code}`)
        .then(result => result.json());
    }

    contextCheckerCallback(context, codeUE) {
        if (context) {
            return context.parameters.code === codeUE;
        }
        
        return false;
    }
}

module.exports = UEFetcher;