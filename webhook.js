const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');
const intents = require('./intents');
const createSenderId = require('./helpers/createApiSenderId');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });
  agent.senderId = createSenderId(agent);
  agent.handleRequest(intents.intentMap);
});

app.listen(PORT, () => console.log(`Webhook listening at port ${PORT}.`));
