const fetch = require('node-fetch');
const Fetcher = require('./Fetcher');
const moment = require('moment-timezone');

/**
 * This class represents a user schedule.
 * Whenever a PrivareUserInfo object is instanciated, it fetches informations of agent.senderId
 * in the API and fills its attributes with the results.
 */
class PrivateUserInfoSchedule extends Fetcher {
    constructor(agent) {
        super(agent); 
        this.contextName = 'private-user-info-schedule'; // Name of the context it generates after fetching succesfully data
    }

    async fetchCallback() {
        let counter = 0;

        const schedule = await fetch('http://assistantutt.ga:8080/api/users/private/schedule', {
            method: 'GET',
            headers: {
                'Sender-Id': this.agent.senderId,
            },
        })  .then(schedule => schedule.json());

        // This is to wrap the schedule array in an object 'schedule'
        
        // We set a context in which we put results of fetched data
        // so we don't have to fetch to the API again.
        if(!schedule.error) {
            const result = { schedule };

            const days = {
                sunday: [0, 'Dimanche'],
                monday: [1, 'Lundi'],
                tuesday: [2, 'Mardi'],
                wednesday: [3, 'Mercredi'],
                thursday: [4, 'Jeudi'],
                friday: [5, 'Vendredi'],
                saturday: [6, 'Samedi'], 
            };

            result.schedule.forEach((course) => {
                // We are adding ID to every course so we can find them easier
                course.id = counter;
                counter += 1;

                // This number is to compare times easier
                course.start.real = course.start.hour + course.start.minute / 60;
                course.end.real = course.end.hour + course.end.minute / 60;

                // This is to convert day into an integer
                course.dayId = days[course.day][0];
                course.dayFr = days[course.day][1];
            });

            return result;
        }
    
        // LES RETURN A CHANGER C'EST MOCHE 
        return schedule;
    }

    /**
     * Match course with a given time (Date object)
     * @param {Date} date 
     */
    match(date) {
        this.hasLoadedCheck();

        // Convert time (hours and minutes) to a single real number
        // so we can compare time easily.
        const time = date.getHours() + date.getMinutes() / 60;
   
        const matchedCourse = this.data.schedule.find(course => (
            course.dayId === date.getDay() &&
            course.start.real   <= time &&
            course.end.real     >= time
        ));

        return matchedCourse;
    }

    /**
     * Match the closest (next) course to date
     * @param {Date} date
     */
    matchNext(date) {
        this.hasLoadedCheck();

        const time = date.getHours() + date.getMinutes() / 60;
    
        let matchedCourse = this.data.schedule.find(course => (
            course.dayId >= date.getDay() &&
            course.start.real > time
        ));

        if (!matchedCourse) {
            matchedCourse = this.data.schedule[0];
        }
        
        return matchedCourse;
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
        return this.matchNext(new Date());
    }


    addRelativeDay(currentDay, day) {   
        const difference = day - currentDay;

        const words = new Map([
            [-2, 'avant-hier'],
            [-1, 'hier'],
            [1, 'demain'],
            [2, 'après-demain']
        ])
    }
    
}

module.exports = PrivateUserInfoSchedule;