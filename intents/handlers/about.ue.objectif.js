const fetchOneUE = require('../../helpers/fetchOneUE');

module.exports = async function handleAboutUEobjectif(agent) {
  console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)} and contexts ${JSON.stringify(agent.contexts)}`)

  const ueContext = agent.getContext('context-ue');

  // There is 2 cases : If user had prompted a UE before, you will have a
  // context and know which UE's objectif user wants. We won't need to fetch to
  // the API again because the UE will be stored in the context object.
  if (agent.parameters.codeUE) {
    return await fetchOneUE(agent.parameters.codeUE)
      .then((ue) => {
        let objectifStr = ue.objectif.join('\n- ');
        objectifStr = `- ${objectifStr}`;

        agent.add(`Voici les objectifs de ${ue.code} :`);
        agent.add(objectifStr);
      });
  } else if (ueContext) {
    const objectifStr = '- ' + ueContext.parameters.ue.objectif.join('\n- ');

    return agent.add(objectifStr);
  } else {
    return agent.add('Objectifs de quelle UE...? 🤔');
  }
}
