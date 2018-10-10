const intents = {}

intents.handleAboutUE = require('./about-ue');

function test(agent) {
  console.log('session: ' +JSON.stringify(agent.session, null, 2));
  console.log('console message: ' + JSON.stringify(agent.consoleMessages, null, 2));
  console.log('alternative : ' + JSON.stringify(agent.alternativeQueryResults, null, 2));
  console.log('query : ' + JSON.stringify(agent.query, null, 2));
  console.log('context : ' + JSON.stringify(agent.contexts, null, 2));
}

intentArrayMapping = [
  ['about.UE', intents.handleAboutUE],
  ['intentTest', test],
]

const intentMap = new Map(intentArrayMapping);

module.exports = intents;
module.exports.intentMap = intentMap;
