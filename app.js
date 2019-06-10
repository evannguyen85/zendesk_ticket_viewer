const express = require('express'),
    app = express(),
    request = require('request');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// index route
app.get('/results', (req, res) => {
    // const url = 'https://evannguyen.zendesk.com/api/v2/tickets/show_many.json?ids=2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27';
    const url = 'https://evannguyen.zendesk.com/api/v2/tickets.json';
    request.get(url, {
        'auth': {
            'user': 'evannguyen85@gmail.com',
            'pass': 'evan@zendesk08',
            'sendImmediately': false
        }
    }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
            console.log('something went wrong');
            console.log(err);
        } else {
            const tickets = JSON.parse(body);
            // list of tickets. need to split
            // console.log(tickets['tickets']);
            let myTickets = tickets['tickets'];

            //set default variables
            let totalTickets = myTickets.length,
                pageSize = 25,
                pageCount = Math.ceil(totalTickets / pageSize),
                currentPage = 1,
                ticketsArrays = [],
                ticketsList = [];

            //split list into groups
            while (myTickets.length > 0) {
                ticketsArrays.push(myTickets.splice(0, pageSize));
            }

            //set current page if specifed as get variable (eg: /?page=2)
            if (typeof req.query.page !== 'undefined') {
                currentPage = +req.query.page; //try to convert into number. eg. +3 returns 3
            }

            //show list of tickets from group
            ticketsList = ticketsArrays[+currentPage - 1];
            console.log(pageCount, currentPage, myTickets.length, pageSize);

            //render results.ejs view file
            res.render('results', {
                tickets: ticketsList,
                pageSize: pageSize,
                totalTickets: totalTickets,
                pageCount: pageCount,
                currentPage: currentPage
            });
        }
    });
});

// show route
app.get('/results/:id', (req, res) => {
    // find the ticket
    const id = req.params.id;
    console.log(id);
    const url = 'https://evannguyen.zendesk.com/api/v2/tickets/' + id + '.json';
    request.get(url, {
        'auth': {
            'user': 'evannguyen85@gmail.com',
            'pass': 'evan@zendesk08',
            'sendImmediately': false
        }
    }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
            console.log('something went wrong');
            console.log(err);
        } else {
            const ticket = JSON.parse(body);
            // console.log(tickets['tickets']);
            // render show template with that ticket
            res.render('show', { ticket: ticket });
        }
    });
});

app.listen(3000, () => {
    console.log('Zendesk ticket viewer app has started');
});