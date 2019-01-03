const PrivateUserInfoSchedule = require('../../classes/PrivateUserInfoSchedule');
const getRelativeDay = require('../../helpers/time/getRelativeDay');

module.exports = async function handleUserPrivateScheduleNext(agent) {
    console.log(`${agent.intent} called with parameters : ${JSON.stringify(agent.parameters)} and contexts ${JSON.stringify(agent.contexts)}`)
    try {
        const userSchedule = new PrivateUserInfoSchedule(agent);
        await userSchedule.fetchData();
        if (!userSchedule.isAuthenticatedNextEvent()) return;

        const currentCourse = userSchedule.match();
        if (currentCourse) {
            agent.add(`Tu devrais être actuellement en ${currentCourse.uv} en ${currentCourse.room} !`);
        }

        const nextCourse = userSchedule.matchNext();

        const type = nextCourse.type;
        const relativeDay = getRelativeDay(new Date(), nextCourse);

        return agent.add(`Tu as un ${type} de ${nextCourse.uv} \
${relativeDay} à ${nextCourse.start.hour}h${nextCourse.start.minute? nextCourse.start.minute:''} \
en ${nextCourse.room} ! `)

    } catch (err) {
        console.log(err);
        return agent.add(`J'ai un petit problème en essayant de consulter ton emploi du temps !`)
    }
}