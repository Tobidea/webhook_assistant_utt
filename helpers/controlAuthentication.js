module.exports = function controlAuthentication({ agent, response }) {
    if (response.error) {
        agent.setFollowupEvent('error_USER_NOT_AUTHENTICATED');
    }
}