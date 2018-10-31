module.exports = function createApiSenderId(agent) {
    // If message is sent from facebook or not.
    const fbSenderId = agent.getContext('generic')? agent.getContext('generic').parameters.facebook_sender_id + '--':'';

    const fullSessionName = agent.session.split('/');
    const sessionId = fullSessionName[fullSessionName.length - 1];
    
    return fbSenderId + sessionId;
}
