const fetch = require('node-fetch');
const { Suggestion } = require('dialogflow-fulfillment');
const fetchOneUE = require('../../helpers/fetchOneUE');


module.exports = async function handleAboutUE(agent) {
  console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)}`)
  const { codeUE } = agent.parameters;
  let slotfiller = false;
  if(codeUE) {
    // if Dialogflow detected an UE entity in the user request
    return await fetchOneUE(codeUE)
      .then((ue) => {
        const context = {
          name: 'context-ue',
          lifespan: 1,
          parameters: { ue },
        }

        // If the semester field is empty it shouldn't display it.
        const ansSemester = ue.semestre? `Cette UE est disponible en ${ue.semestre}`:''

        agent.add(`${ue.code} : ${ue.titre}`);
        agent.add(`C'est une ${ue.categorie} qui donne ${ue.credits} crédits ECTS. ${ansSemester}`);
        agent.add(new Suggestion ('Objectifs de l\'UE'));
        agent.add(new Suggestion ('Programme de l\'UE'));

        agent.setContext(context);
      });
  } else {
    // This is when user hasn't mentioned any UE name.
    if (!agent.getContext('context-wrongUE')) {
      agent.add('Vous voulez des infos sur quelle UE?');
      agent.setContext({
        name: 'context-wrongUE',
        lifespan: '1',
        parameters: {},
      });
    } else {
      agent.add('Pardon, je ne connais pas cette UE !');
    }

  }
}

module.exports.intentName = 'about.ue';