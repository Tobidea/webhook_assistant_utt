const fetch = require('node-fetch');

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

  if (agent.parameters.codeUE) {
    return await fetchOneUE(codeUE)
      .then((ue) => {
        let objectifStr = ['- ', ueContext.objectif].join('\n- ');
        agent.add(`Voici les objectifs de ${ue.code} :`);
        agent.add(objectifStr);
      });
  } else if (ueContext) {
    let objectifStr = ['- ', ueContext.parameters.objectif].join('\n- ');
    agent.add(objectifStr);
  } else {
    agent.add('Objectif de...? 🤔')
  }
}
