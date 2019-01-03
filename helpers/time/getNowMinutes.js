const convertToMinutePassed = require('./convertToMinutesPassed');

/**
 * Converts actual time to UTC+1 to minutes passed since first day of week (sunday midnight)
 * This is to make comparisons easier between times of week.
 * @param {Number} [utcOffset = 1] UTC offset for different timezones. 1 by default.
 */
function getNowMinutes(utcOffset = 1) {
	const now = new Date();
	const nowMinutes = convertToMinutePassed({
		hour: (now.getUTCHours() + 1) % 24,
		minute: now.getUTCMinutes(),
		day: now.getUTCHours() === 23? (now.getUTCDay() + 1) % 6:now.getUTCDay(),
	})

	return nowMinutes;
}

module.exports = getNowMinutes;