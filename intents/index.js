const intents = {}

intents.handleAboutUE = require('./about-ue');
intents.handleAboutUEobjectif = require('./about-ue-objectif');
intents.handleAboutUEprogramme = require('./about-ue-programme');
intents.handleAboutUEsemestre = require('./about-ue-semestre')

function test(agent) {
  console.log('session: ' +JSON.stringify(agent.session, null, 2));
  console.log('console message: ' + JSON.stringify(agent.consoleMessages, null, 2));
  console.log('alternative : ' + JSON.stringify(agent.alternativeQueryResults, null, 2));
  console.log('query : ' + JSON.stringify(agent.query, null, 2));
  console.log('context : ' + JSON.stringify(agent.contexts, null, 2));
  console.log('getcontext: ' + JSON.stringify(agent.getContext('context-ue')));
  console.log('getcontext: ' + JSON.stringify(agent.getContext('context-wrongue')));
}

const intentArrayMapping = [
  ['about.UE', intents.handleAboutUE],
  ['intentTest', test],
  ['about.UE.objectif', intents.handleAboutUEobjectif],
  ['about.UE.programme', intents.handleAboutUEprogramme],
  ['about.UE.semestre', intents.handleAboutUEsemestre]
]

const intentMap = new Map(intentArrayMapping);

module.exports = intents;
module.exports.intentMap = intentMap;
