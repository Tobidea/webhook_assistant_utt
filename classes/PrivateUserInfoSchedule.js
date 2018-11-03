const fetch = require('node-fetch');
const Fetcher = require('./Fetcher');

/**
 * This class represents a user schedule.
 * Whenever a PrivareUserInfo object is instanciated, it fetches informations of agent.senderId
 * in the API and fills its attributes with the results.
 */
module.exports = class PrivateUserInfoSchedule extends Fetcher {
    constructor(agent) {
        super(agent); 
        this.contextName = 'private-user-info-schedule'; // Name of the context it generates after fetching succesfully data
    }

    async rawFetchData() {
        let counter = 0;
        const result = await fetch('http://assistantutt.ga:8080/api/users/private/schedule', {
            method: 'GET',
            headers: {
                'Sender-Id': this.agent.senderId,
            },
        })  .then(schedule => schedule.json())
            .then(schedule => {
                // We are adding ID to every course so we can find them easier
                schedule.forEach((course) => {
                    course.id = counter;
                    course.startFloat = course.start.hour + course.start.minute / 60;
                    counter += 1;
                });
                
                return schedule;
            });
    
        // We set a context in which we put results of fetched data
        // so we don't have to fetch to the API again.
        if(!result.error) {
            this.agent.setContext({
                name: this.contextName,
                lifespan: '5',
                parameters: result,
            });
        }
    
        return result;
    }

    /**
     * Match course with a given time (Date object)
     * @param {Date} date 
     */
    match(date) {
        this.hasLoadedCheck();

        const days = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        ];

        // Convert time (hours and minutes) to a single real number
        // so we can compare time easily.
        const time = date.getHours() + date.getMinutes() / 60;
   
        const matchedCourse = this.data.find(course => (
            course.day === days[date.getDay()] &&
            course.start.hour + course.start.minute / 60 <= time &&
            course.end.hour + course.end.minute / 60 >= time
        ));

        return matchedCourse;
    }

    /**
     * Match the closest course to date
     * @param {Date} date
     */
    matchNext(date) {
        this.hasLoadedCheck();

        const time = date.getHours() + date.getMinutes() / 60;

        // let matchedCourse = this.data.forEach(() => {

        // })
        
        
    }

    /**
     * Returns matched course for current time
     */
    getNow() {
        return this.match(new Date());
    }

    /**
     * Returns next course for current time
     */
    getNext() {
        const currentCourse = this.getNow();
        
        return this.data.find(course => (
            course.id === currentCourse.id
        ));
    }
    
}