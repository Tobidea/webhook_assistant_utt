const PrivateUserInfoSchedule = require('../classes/PrivateUserInfoSchedule');

module.exports = async function handleUserPrivateScheduleNext(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)} and contexts ${JSON.stringify(agent.contexts)}`)
    try {
        const userSchedule = new PrivateUserInfoSchedule(agent);
        await userSchedule.fetchData();
        if (!userSchedule.isAuthenticatedNextEvent()) return;

        const currentCourse = userSchedule.getNow();
        if(currentCourse) {
            agent.add(`Tu devrais être actuellement en ${currentCourse.uv} en ${currentCourse.room} !`);
        }

        const nextCourse = userSchedule.getNext();

        agent.add(`Ton prochain cours c'est ${nextCourse.uv} \
à ${nextCourse.start.hour}h${nextCourse.start.minute? nextCourse.start.minute:''} \
en ${nextCourse.room} ! `)
        // return agent.add(`Tu commences lundi à ${userSchedule.data.schedule[0].start.hour}h avec ${userSchedule.data.schedule[0].uv} en ${userSchedule.data.schedule[0].room}`);

    } catch (err) {
        console.log(err);
        return agent.add(`J'ai un petit problème en essayant de consulter ton emploi du temps !`)
    }
}