const fetch = require('node-fetch');
const { Suggestion } = require('dialogflow-fulfillment');

async function fetchOneUE(code) {
  try {
    return await fetch(`http://assistantutt.ga:8080/ue/${code}`)
      .then(result => result.json());

  } catch (err) {
    console.log(`An error occured when fetching one UE : ${err}`);
    return new Error('Error when fetching UE')
  }
}

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

        agent.add(`Voici les de ${ue.code} :`);
        agent.add(objectifStr);
      });
  } else if (ueContext) {
    let objectifStr = ueContext.parameters.ue.objectif.join('\n- ');
    objectifStr = `- ${objectifStr}`; // Just to add the "-" to the first element.

    agent.add(objectifStr);
  } else {
    agent.add('Objectifs de quoi...? 🤔');
  }
}
