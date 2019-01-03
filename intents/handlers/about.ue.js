const { Suggestion, Payload } = require('dialogflow-fulfillment');
const UEFetcher = require('../../classes/UEFetcher');


module.exports = async function handleAboutUE(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)} and contexts ${JSON.stringify(agent.contexts)}`)

    const { codeUE } = agent.parameters;

    try {
        if (codeUE) {
            
            const ueInfo = new UEFetcher(agent);
            const ue = await ueInfo.fetchData(codeUE) ;
            
            agent.add(`${ue.code} : ${ue.titre}`);
            agent.add(`C'est une ${ue.categorie} qui donne ${ue.credits} crédits ECTS. ${ue.semestre? `Cette UE est disponible en ${ue.semestre}`:''}`);

            const suggestions = new Payload(agent.FACEBOOK, {
                text: `Besoin d'autre chose?`,
                quick_replies: [`Objectifs de l'UE`, `Programme de l'UE`]
                .map(option => {
                    return {
                        content_type: 'text',
                        title: option,
                        payload: option
                    }
                })
            }, {sendAsMessage: true});

            agent.add(suggestions);
            
            // agent.add(new Suggestion (`Objectifs de l'UE`));
            // agent.add(new Suggestion (`Programme de l'UE`));

        } else {
            agent.add('Quelle UE?');
        }


    } catch (err) {
        console.log(err);
        return agent.add(`Désolé j'ai eu un problème en essayant de retrouver cette UE.`)
    }
    

}

module.exports.intentName = 'about.ue';