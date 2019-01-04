const { Payload } = require('dialogflow-fulfillment');

/**
 * Payload factory used to create suggestions in Facebook integration.
 * @param {String} text Text printed before 
 * @param {String[]} options Title of diffrent suggestions. Up to 5 suggestions
 * @param {Boolean} [sendAsMessage] sendAsMessage boolean option in the payload constructor. True by default.
 */
function textSuggestions(text, options, sendAsMessage = true) {
    const payload = new Payload('FACEBOOK', {
        text,
        quick_replies: options
        .slice(0,5)
        .map(suggestionName => {
            return {
                content_type: 'text',
                title: suggestionName,
                payload: suggestionName,
            }
        })
    }, { sendAsMessage });

    return payload;
}

module.exports = textSuggestions;