const intents = {}

function test(agent) {
  console.log('session: ' +JSON.stringify(agent.session, null, 2));
  console.log('console message: ' + JSON.stringify(agent.consoleMessages, null, 2));
  console.log('alternative : ' + JSON.stringify(agent.alternativeQueryResults, null, 2));
  console.log('query : ' + JSON.stringify(agent.query, null, 2));
  console.log('context : ' + JSON.stringify(agent.contexts, null, 2));
  // console.log('sessionc: ' + ));
}

const intentArrayMapping = [
  ['about.UE', require('./about-ue')],
  ['intentTest', test],
  ['about.UE.objectif', require('./about-ue-objectif')],
  ['about.UE.programme', require('./about-ue-programme')],
  ['about.UE.semestre', require('./about-ue-semestre')],
  ['user.authenticate', require('./user-authenticate')],
  ['user.private.who', require('./user-private-who')],
  ['user.private.ueFollowed', require('./user-private-ueFollowed')],
]

const intentMap = new Map(intentArrayMapping);

module.exports = intents;
module.exports.intentMap = intentMap;
