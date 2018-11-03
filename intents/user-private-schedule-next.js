const PrivateUserInfoSchedule = require('../classes/PrivateUserInfoSchedule');

module.exports = async function handleUserPrivateScheduleNext(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)} and contexts ${JSON.stringify(agent.contexts)}`)
    try {
        const userSchedule = new PrivateUserInfoSchedule(agent);
        await userSchedule.fetchData();
        if (!userSchedule.isAuthenticatedNextEvent()) return;
        console.log(userSchedule.data);
        const currentCourse = userSchedule.getNow();
        if(currentCourse) {
            agent.add(`Tu devrais être actuellement en ${currentCourse.uv} en ${currentCourse.room} !`);
        }

        // ATTENTION LA FONCTION FONCTIONNE PAS ENCORE LOL
        // const nextCourse = userSchedule.getNext();
        // agent.add(`Ton prochain cours est ${nextCourse.uv}`)
        agent.add(`Tu commences lundi à ${userSchedule.data[0].start.hour}h avec ${userSchedule.data[0].uv} en ${userSchedule.data[0].room}`);

    } catch (err) {
        console.log(err);
        return agent.add(`J'ai un petit problème en essayant de consulter ton emploi du temps !`)
    }
}