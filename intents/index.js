/**
 * This file is used to load every intents handlers from ./handlers
 * It handles intent corresponding to the fila name : <intent_name_handled>.js
 */

const path = require('path');
const fs = require('fs');

const intents = {}

const intentHandlersPath =  path.join(__dirname + '/handlers');
const intentHandlersFiles = fs.readdirSync(intentHandlersPath);

const intentMap = new Map();

intentHandlersFiles.forEach((filename) => {
  const handler = require(`./handlers/${filename}`)
  const intentName = filename.replace(/(\.js)$/, '');
  intentMap.set(intentName, handler)
});

module.exports = intents;
module.exports.intentMap = intentMap;
