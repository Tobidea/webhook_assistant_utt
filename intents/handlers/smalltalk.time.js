const moment = require('moment-timezone');

module.exports = function handleSmalltalkTime(agent) {
    const date = moment(new Date()).tz('Europe/Paris');

    return agent.add(`Il est ${date.format('HH:mm')}...`);
}