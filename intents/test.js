const fs = require('fs');
const path = require('path');

// const normalizedPath =  path.join(__dirname);

// const files = fs.readdirSync(normalizedPath)

let text = 'jst.js'

let regex = /(\.js)$/;

console.log(text.replace(regex, ''));
console.log(text);