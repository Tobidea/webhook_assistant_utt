const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {

  const agent = new WebhookClient({ request: req, response: res });

  function envoyerMessageFollowup(agent) {
    console.log('ENVOYERMESSAGE FOLLOWUP :');
    console.log(req.body);
    agent.add(`MESSAGE WEBHOOK : Vous avez envoyé "${req.body.queryResult.parameters.message}"`);
  }

  const intentMap = new Map();
  intentMap.set('envoyer.message - demander message', envoyerMessageFollowup);

  agent.handleRequest(intentMap);
});

app.post('/test', (req, res) => {
  console.log('Contenu de la requête :');
  console.log(req.body);
});


app.listen(PORT, () => console.log(`Ecoute sur le port ${PORT}.`));
