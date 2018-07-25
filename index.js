const express = require('express');
const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {

  const agent = new WebhookClient({ request: req, response: res });

  // Fonction qui gère l'envoi des messages aux développeurs
  function envoyerMessageFollowup(agent) {
    console.log(`${agent.intent} : "${agent.parameters.message}"`);
    agent.add(`MESSAGE WEBHOOK : Vous avez envoyé "${agent.parameters.message}"`);
  }

  function getInfoUE(agent) {
    console.log(`${agent.intent}`);
    console.log(`Recherche d'informations sur l'UE ${agent.parameters.codeUE}`);

    // fetch(`http://assistantutt.ga:8080/get/UE?code=${agent.parameters.codeUE}`);

  }

  const intentMap = new Map();
  intentMap.set('envoyer.message - demander message', envoyerMessageFollowup);
  intentMap.set('about.UE', getInfoUE);

  agent.handleRequest(intentMap);
});

app.listen(PORT, () => console.log(`Ecoute sur le port ${PORT}.`));
