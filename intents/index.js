const intents = {}

intents.handleAboutUE = require('./about-ue');

function test(agent) {
  console.log(agent.session);
  console.log(agent.consoleMessages);
  console.log(agent.query);
  console.log(agent.contexts);
}

intentArrayMapping = [
  ['about.UE', intents.handleAboutUE],
  ['intentTest', test],
]

const intentMap = new Map(intentArrayMapping);

module.exports = intents;
module.exports.intentMap = intentMap;
