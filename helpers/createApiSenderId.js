/**
 * Function used to "generate" a sender-id based on agent.session and
 * Facebook's sender's id if sent from Facebook.
 * @param {WebhookClient} agent Dialogflow's agent object
 * @returns The sender ID (string)
 */
function createApiSenderId(agent) {
    // If message is sent from facebook or not.
    const fbSenderId = agent.getContext('generic')? agent.getContext('generic').parameters.facebook_sender_id + '--':'';

    const fullSessionName = agent.session.split('/');
    const sessionId = fullSessionName[fullSessionName.length - 1];
    
    return fbSenderId + sessionId;
}

module.exports = createApiSenderId;