/**
 * 
 */

 
 /**
  * This function avoids fetching to API multiple time if something we need
  * to fetch has already been put in context of the session.
  * @param  {Object} Object
  * @param  {WebhookClient} Object.agent
  * @param  {string} Object.contextName
  * @param  {function} Object.callback
  */
 module.exports = async function isAlreadyInContext({ agent, contextName, callback }) {
    try {
        const context = agent.getContext(contextName);

        console.log(JSON.stringify(context));

        if (context) {
             console.log(`${contextName} context already exists, no fetch required.`)
             return context.parameters;
        } else {
             return await callback();
        }
    } catch (err) {
        console.log(err);
        throw err;
    } 
 }