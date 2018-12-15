const UEFetcher = require('../../classes/UEFetcher');

module.exports = async function handleAboutUEprogramme(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)} and contexts ${JSON.stringify(agent.contexts)}`)
    
    const {codeUE} = agent.parameters;
    
    try {

        let ue;

        if (codeUE) {
            const ueInfo = new UEFetcher(agent);
            ue = await ueInfo.fetchData(codeUE);
        } else if (agent.getContext('ue-info')) {
            /**
             * When user does not specify any codeUE in his request, it finds
             * the result for the UE in context.
             */
            ue = agent.getContext('ue-info').parameters;
        } else {
            return agent.add('Programme de quelle UE...? 🤔');
        }

        const programmeStr = '- ' + ue.programme.join('\n- ');
            
        agent.add(`Voici le programme de ${ue.code} :`);
        agent.add(programmeStr);

    } catch (err) {
        console.log(err);
        return agent.add(`J'ai eu un problème en recherchant le programme de l'UE..`)
    }
}
