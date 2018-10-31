/**
 * This function avoids fetching to API multiple time if something we need
 * to fetch has already been put in context of the session.
 */

 module.exports = async function isAlreadyInContext({ agent, contextName, callback }) {
    try {
        const context = agent.getContext(contextName);
         if (context) {
             console.log(`${contextName} exists, no fetch required.`)
             return context;
         } else {
             return await callback();
         }
    } catch (err) {
        console.log(err);
        throw err;
    } 
 }