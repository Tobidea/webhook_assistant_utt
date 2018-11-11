const path = require('path');
const fs = require('fs');

const intents = {}

const intentArrayMapping = [
  ['about.UE', require('./handlers/about.ue')],
  ['about.UE.objectif', require('./about.ue.objectif')],
  ['about.UE.programme', require('./handlers/about.ue.programme')],
  ['about.UE.semestre', require('./about.ue.semestre')],
  ['user.authenticate', require('./handlers/user.authenticate')],
  ['user.private.who', require('./user.private.who')],
  ['user.private.ueFollowed', require('./user.private.ueFollowed')],
  ['user.private.schedule.next', require('./user.private.schedule.next')],
  ['smalltalk.time', require('./user.private.schedule.next')],
]

const intentHandlersPath =  path.join(__dirname/ + 'handlers');
const intentHandlersFiles = fs.readdirSync(intentHandlersPath);

const intentMap = new Map();

intentHandlersFiles.forEach((filename) => {
  let intentName = filename.replace(/(\.js)$/, '');
  intentMap.set(intentName, require(`./handlers/${filename}`))
})


module.exports = intents;
module.exports.intentMap = intentMap;
