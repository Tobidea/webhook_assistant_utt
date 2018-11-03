const PrivateUserInfoSchedule = require('../classes/PrivateUserInfoSchedule');

module.exports = async function handleUserPrivateScheduleNext(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)} and contexts ${JSON.stringify(agent.contexts)}`)
    try {
        const userSchedule = new PrivateUserInfoSchedule(agent);
        await userSchedule.fetchData();
        if (!userSchedule.isAuthenticatedNextEvent()) return;
        console.log(userSchedule);
        const currentCourse = userSchedule.getNow();
        if(currentCourse) {
            agent.add(`Tu devrais être actuellement en ${currentCourse.uv} en ${currentCourse.room} !`);
        }

        // ATTENTION LA FONCTION FONCTIONNE PAS ENCORE LOL
        // const nextCourse = userSchedule.getNext();
        // agent.add(`Ton prochain cours est ${nextCourse.uv}`)
        agent.add('prout');

    } catch (err) {
        console.log(err);
        return agent.add(`J'ai un petit problème en essayant de consulter ton emploi du temps !`)
    }
}