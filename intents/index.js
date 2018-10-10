const intents = {}

intents.handleAboutUE = require('./about-ue');

function test(agent) {
  console.log('session: ' +agent.session);
  console.log('console message: ' + agent.consoleMessages);
  console.log('alternative : ' + agent.alternativeQueryResults)
  console.log('query : ' + agent.query);
  console.log('context : ' + agent.contexts);
}

intentArrayMapping = [
  ['about.UE', intents.handleAboutUE],
  ['intentTest', test],
]

const intentMap = new Map(intentArrayMapping);

module.exports = intents;
module.exports.intentMap = intentMap;
