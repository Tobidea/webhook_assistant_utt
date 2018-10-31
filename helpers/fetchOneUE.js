const fetch = require('node-fetch');

module.exports = async function fetchOneUE(code) {
  try {
    return await fetch(`http://assistantutt.ga:8080/api/ue/${code}`)
      .then(result => result.json());

  } catch (err) {
    console.log(`An error occured when fetching one UE : ${err}`);
    return new Error('Error when fetching UE')
  }
}
