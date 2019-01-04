const UEFetcher = require('../../classes/UEFetcher');

module.exports = async function handleAboutUEsemestre(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)} and contexts ${JSON.stringify(agent.contexts)}`)
    
    const {codeUE} = agent.parameters;
    
    try {
        let ue;

        if (codeUE) {
            const ueInfo = new UEFetcher(agent);
            ue = await ueInfo.fetchData(codeUE);
        } else if (agent.context.get('ue-info')) {
            /**
             * When user does not specify any codeUE in his request, it finds
             * the result for the UE in context.
             */
            ue = agent.context.get('ue-info').parameters;

            console.log(ue);
        } else {
            return agent.add('De quelle UE tu parles ? 🤔');
        }

        if (ue.semestre) {
            console.log(JSON.stringify(ue));
            const semestres = ue.semestre.split(' / ');
            console.log(semestres);
            const response = semestres.length === 2? `${semestres[0]} et ${semestres[1]}`:`${semestres[0]}`;
            
            return agent.add(`${ue.code} est disponible en ${response}`);
        } else {
            return agent.add(`Sorry, je possède pas cette information :/`);
        }

    } catch (err) {
        console.log(err);
        return agent.add(`J'ai eu un problème en recherchant le programme de l'UE..`)
    }
}
