/**
 * Time passed in parameters to minutes passed since first day of week (sunday midnight)
 * This is to make comparisons easier between times of week.
 * 
 * @param {(Object|Date)} time Date object or Object with {day, hour, minute} attributes
 * @param {Number} time.day Day as an integer
 * @param {Number} time.hour Hour as an integer in 24h format
 * @param {Number} time.minute Minutes as an integer (< 59)
 *
 */
function convertToMinutesPassed(time) {

	if (time instanceof Date) {
		return time.getUTCDay() * 1440 + time.getUTCHours() * 60 + time.getUTCMinutes();
	} else {
		const { day, hour, minute } = time;

		return day * 1440 + hour * 60 + minute;
	}

}

module.exports = convertToMinutesPassed;