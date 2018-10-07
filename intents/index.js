const intents = {}

intents.handleAboutUE = require('./about-ue');



intentArrayMapping = [
  ['about.UE', intents.handleAboutUE],
]

const intentMap = new Map(intentArrayMapping);


module.exports = intents;
module.exports.intentMap = intentMap;
