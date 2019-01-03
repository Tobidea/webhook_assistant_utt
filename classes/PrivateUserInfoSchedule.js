const fetch = require('node-fetch');
const Fetcher = require('./Fetcher');
const getNowMinutes = require('../helpers/time/getNowMinutes');
const convertToMinutesPassed = require('../helpers/time/convertToMinutesPassed');

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
        
    
        // On fait ça pour wrapper schedule dans l'attribut data
        if(!schedule.error) {
            return this._enhanceSchedule(schedule);
        }
    
        // LES RETURN A CHANGER C'EST MOCHE 
        return schedule;
    }

    /**
     * 
     */
    _enhanceSchedule(schedule) {
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

        let counter = 0;

        result.schedule.forEach((course) => {
            
            // We are adding ID to every course so we can find them easier
            course.id = counter;
            counter += 1;

            // Adding day as an integer
            course.dayId = days[course.day][0];

            // Adding french day name
            course.dayFr = days[course.day][1];

            course.start.minutesPassed = convertToMinutesPassed({
                hour: course.start.hour,
                minute: course.start.minute,
                day : course.dayId,
            })
            
            course.end.minutesPassed = convertToMinutesPassed({
                hour: course.end.hour,
                minute: course.end.minute,
                day : course.dayId,
            })

        });

        return result;
    }

    /**
     * Match course at the given time (Date object or minutes)
     * If no parameters, matches next course for current time.
     * If there is no match, it returns 'undefined'.
     * @param {Date|Number} [date] Date or minutes (integer) passed since monday
     * @return {Object} A course object
     */
    match(date = getNowMinutes()) {
        this.hasLoadedCheck();

        let time;

        // Arguments validation
        if (date instanceof Date) {
            time = convertToMinutesPassed(date);
        } else if (typeof date === 'number'){
            time = date;
        } else {
            throw new Error('Argument of match() must be either Date or Number.')
        }
        
        const matchedCourse = this.data.schedule.find(course => {        
            return (course.start.minutesPassed <= time &&
                    course.end.minutesPassed >= time);
        })

        return matchedCourse;
    }

    /**
     * Match the closest (next) course to Date specified in parameter
     * If no parameters, matches next course for current time.
     * @param {Date|Number} [date] Date or minutes (integer) passed since monday
     * @return {Object} A course object
     */
    matchNext(date = getNowMinutes()) {
        this.hasLoadedCheck();

        let time;

        // Arguments validation
        if (date instanceof Date) {
            time = convertToMinutesPassed(date);
        } else if (typeof date === 'number'){
            time = date;
        } else {
            throw new Error('Argument of matchNext() must be either Date or Number.')
        }

        let nextCourse = this.data.schedule.find((course) => {
            return course.start.minutesPassed >= time;
        })

        // If it doesn't match anything, that must be because we are at the end of the week
        // So we assign nextCourse to first course of the week.
        if (!nextCourse) {
            nextCourse = this.data.schedule[0];
        }
        
        return nextCourse;
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