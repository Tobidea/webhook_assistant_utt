const { Suggestion } = require('dialogflow-fulfillment');
const UEFetcher = require('../../classes/UEFetcher');


module.exports = async function handleAboutUE(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)
    const { codeUE } = agent.parameters;

    try {

        if (codeUE) {
            const ueInfo = new UEFetcher(agent);
            await ueInfo.fetchData(codeUE);

            const ue = ueInfo.data;

            console.log(ue);
            
            agent.add(`${ue.code} : ${ue.titre}`);
            agent.add(`C'est une ${ue.categorie} qui donne ${ue.credits} crédits ECTS. ${ue.semestre? `Cette UE est disponible en ${ue.semestre}`:''}`);
            agent.add(new Suggestion ('Objectifs de l\'UE'));
            agent.add(new Suggestion ('Programme de l\'UE'));
        } else {
            agent.add('Quelle UE?');
        }


    } catch (err) {
        console.log(err);
        return agent.add(`Désolé j'ai eu un problème en essayant de retrouver cette UE.`)
    }
    

}

module.exports.intentName = 'about.ue';