const express = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();

const PORT = process.env.PORT || 8080;


app.get('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function envoyerMessageFollowup(agent) {
    agent.add(`MESSAGE WEBHOOK : Vous avez envoyé "${req.body.queryResult.parameters.message}"`);
  }
  const intentMap = new Map();
  intentMap.set('envoyer.message - demander message', envoyerMessageFollowup);

  agent.handleRequest(intentMap);
});


app.listen(PORT, () => console.log(`Ecoute sur le port ${PORT}.`));
