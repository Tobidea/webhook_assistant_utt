/**
 * Returns the word corresponding to the relative time of a date and a course
 * For example if the course is the next day of date, it returns 'demain'
 * @param {Date} date 
 * @param {Object} course 
 * @return {String} Relative day string
 */
function getRelativeDay(date, course) {
    const day = date.getDay();
    const difference = course.dayId - day;
    let result;

    const words = new Map([
        [-2, 'avant-hier'],
        [-1, 'hier'],
        [0, `aujourd'hui`],
        [1, 'demain'],
        [2, 'après-demain']
    ])

    if (words.has(difference)) {
        result = words.get(difference);
    } else {
        result = course.dayFr;
    }

    return result;
}

module.exports = getRelativeDay;