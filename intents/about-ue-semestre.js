const fetch = require('node-fetch');
const { Suggestion } = require('dialogflow-fulfillment');
const fetchOneUE = require('../helpers/fetchOneUE');

module.exports = async function handleAboutUEsemestre(agent) {
  console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)} and contexts ${JSON.stringify(agent.contexts)}`)

  const ueContext = agent.getContext('context-ue');
  let ue;
  // There is 2 cases : If user had prompted a UE before, you will have a
  // context and know which UE's objectif user wants. We won't need to fetch to
  // the API again because the UE will be stored in the context object.
  if (agent.parameters.codeUE) {
    ue = await fetchOneUE(agent.parameters.codeUE);
  } else if (ueContext) {
    ue = ueContext;
  } else {
    agent.add('Disponibilité de quelle UE?');
  }

  if (ue) {
    const semestres = ue.semestre.split(' / ');
    const response = semestres.length === 2? `${semestres[0]} et ${semestres[1]}`:`${semestres[0]}`;

    agent.add(`${ue.code} est disponible en ${response}`);
  }

}
