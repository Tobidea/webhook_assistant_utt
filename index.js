const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
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

  async function getInfoUE(agent) {
    if (agent.parameters.codeUE) {
      console.log(`${agent.intent}`);
      console.log(`Recherche d'informations sur l'UE ${agent.parameters.codeUE}`);

      try{
        return await fetch(`http://assistantutt.ga:8080/get/UE?code=${agent.parameters.codeUE}`)
        .then(resultat => resultat.json())
        .then((UE) => {
          if (!UE.error){
            agent.add(`${UE.code} : ${UE.nom}`);
            agent.add(UE.description);
          } else {
            agent.add(`Désolé, ${agent.parameters.codeUE} n'a pas pu être trouvée...`)
          }
        });
      } catch (err) {
        console.log('Une erreur est survenue :');
        console.log(err);
      }

    }

  }

  const intentMap = new Map();
  intentMap.set('envoyer.message - demander message', envoyerMessageFollowup);
  intentMap.set('about.UE', getInfoUE);

  agent.handleRequest(intentMap);
});

app.listen(PORT, () => console.log(`Ecoute sur le port ${PORT}.`));
