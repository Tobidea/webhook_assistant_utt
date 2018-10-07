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
  async function envoyerMessageFollowup(agent) {
    console.log(`${agent.intent} : "${agent.parameters.message}"`);

    try{
      return await fetch('http://assistantutt.ga:8080/add/userFeedback', {
        method: 'POST',
        body: {
          contenu: agent.parameters.message,
        },
      })
      .then(() => agent.add(`Vous avez envoyé "${agent.parameters.message}" aux développeurs !`));
    } catch (err) {
      console.log(err);
      agent.add('Une erreur est survenue lors de l\'envoi du message...');
    }
  }

  async function getInfoUE(agent) {
    if (agent.parameters.codeUE) {
      // Ce cas de figure s'active lorsque l'utilisateur a bien renseigné une entité @CodeUE
      console.log(`${agent.intent}`);
      console.log(`Recherche d'informations sur l'UE ${agent.parameters.codeUE}`);

      try{
        return await fetch(`http://assistantutt.ga:8080/ue/${agent.parameters.codeUE}`)
        .then(resultat => resultat.json())
        .then((UE) => {
          if (!UE.error){
            agent.add(`${UE.code} : ${UE.titre}`);
          } else {
            agent.add(`Désolé, ${agent.parameters.codeUE} n'a pas pu être trouvée...`)
          }
        });
      } catch (err) {
        console.log('Une erreur est survenue :');
        console.log(err);
        agent.add('Désolé une erreur est survenue...');
      }
    } else {
      // Ce cas de figure s'active lorsque l'utilisateur n'a pas renseigné dans sa requête le nom de l'UE recherchée
      agent.add('Sur quelle UE voulez vous des informations?');
    }

  }

  const intentMap = new Map();
  intentMap.set('envoyer.message - demander message', envoyerMessageFollowup);
  intentMap.set('about.UE', getInfoUE);

  agent.handleRequest(intentMap);
});

app.listen(PORT, () => console.log(`Ecoute sur le port ${PORT}.`));
