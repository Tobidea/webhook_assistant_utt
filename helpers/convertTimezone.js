const moment = require('moment-timezone');

function convertTimezone(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
}

const date = new Date();
const convertedDate = convertTimezone(date);
const momentDate = moment(date);

momentDate.tz('Europe/Paris');
console.log(momentDate.format(':mH'));
