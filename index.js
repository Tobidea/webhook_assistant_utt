const express = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();

const PORT = process.env.PORT || 8080;


app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ req, res });

  function envoyerMessageFollowup(agent) {
    console.log('Appel de envoyermessage, contenu de la requête :');
    console.log(JSON.stringify(req));
    agent.add(`MESSAGE WEBHOOK : Vous avez envoyé "${req.body.queryResult.parameters.message}"`);
  }

  const intentMap = new Map();
  intentMap.set('envoyer.message - demander message', envoyerMessageFollowup);

  agent.handleRequest(intentMap);
});


app.listen(PORT, () => console.log(`Ecoute sur le port ${PORT}.`));
