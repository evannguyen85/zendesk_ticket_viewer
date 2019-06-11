const request = require('request');
function requestTickets(url, handleErrors, handleTickets) {
    request.get(url, {
        'auth': {
            'user': 'evannguyen85@gmail.com',
            'pass': 'evan@zendesk08',
            'sendImmediately': false
        }
    }, (err, response, body) => {
        const returnedData = JSON.parse(body);
        if (err || response.statusCode !== 200) {
            handleErrors(returnedData.error, err, response.statusCode);
        } else {
            handleTickets(returnedData);
        }
    });
}

module.exports = requestTickets;